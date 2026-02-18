// api/stripe/webhook.js - Handle Stripe webhook events
import Stripe from 'stripe';
import { sql } from '@vercel/postgres';
import { UserDB } from '../../lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Vercel needs raw body for signature verification
export const config = { api: { bodyParser: false } };

async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  let event;
  try {
    const rawBody = await buffer(req);
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  try {
    switch (event.type) {

      // ── Checkout completed (both subscription + one-time) ──
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = parseInt(session.metadata?.userId);
        const plan = session.metadata?.plan;

        if (!userId || !plan) {
          console.warn('Webhook: missing userId or plan in metadata');
          break;
        }

        if (plan === 'philosopher') {
          // Lifetime — no expiry
          await UserDB.updateStripeSubscription(userId, null, 'philosopher', null);
          console.log(`✅ User ${userId} upgraded to Philosopher (lifetime)`);
        } else if (plan === 'thinker' && session.subscription) {
          // Subscription — set expiry to subscription period end
          const sub = await stripe.subscriptions.retrieve(session.subscription);
          const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
          await UserDB.updateStripeSubscription(userId, session.subscription, 'thinker', expiresAt);
          console.log(`✅ User ${userId} subscribed to Thinker until ${expiresAt}`);
        }

        // Log to admin_activity_log
        await sql`INSERT INTO admin_activity_log (admin_id, action, details)
          VALUES (${userId}, 'stripe_payment', ${JSON.stringify({ plan, sessionId: session.id, amount: session.amount_total })})`;
        break;
      }

      // ── Subscription renewed ──
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        if (invoice.billing_reason === 'subscription_cycle') {
          const sub = await stripe.subscriptions.retrieve(invoice.subscription);
          const customerId = invoice.customer;
          const user = await UserDB.findByStripeCustomer(customerId);
          if (user) {
            const expiresAt = new Date(sub.current_period_end * 1000).toISOString();
            await UserDB.updateStripeSubscription(user.id, invoice.subscription, 'thinker', expiresAt);
            console.log(`🔄 User ${user.id} Thinker renewed until ${expiresAt}`);
          }
        }
        break;
      }

      // ── Subscription cancelled or expired ──
      case 'customer.subscription.deleted': {
        const sub = event.data.object;
        const user = await UserDB.findByStripeCustomer(sub.customer);
        if (user) {
          await UserDB.updateStripeSubscription(user.id, null, 'free', null);
          console.log(`⬇️ User ${user.id} downgraded to free (subscription ended)`);
        }
        break;
      }

      // ── Payment failed ──
      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        console.warn(`⚠️ Payment failed for customer ${invoice.customer}, invoice ${invoice.id}`);
        // Don't immediately downgrade — Stripe retries. Downgrade happens on subscription.deleted.
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return res.status(500).json({ error: 'Webhook processing failed' });
  }
}
