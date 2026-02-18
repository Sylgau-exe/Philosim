// api/stripe/checkout.js - Create Stripe checkout session
import Stripe from 'stripe';
import { requireAuth, cors } from '../../lib/auth.js';
import { UserDB } from '../../lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Set these in Vercel env vars after creating products in Stripe Dashboard
const PRICE_IDS = {
  thinker: process.env.STRIPE_PRICE_THINKER,      // recurring $19/mo
  philosopher: process.env.STRIPE_PRICE_PHILOSOPHER // one-time $149
};

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const decoded = await requireAuth(req, res);
  if (!decoded) return;

  try {
    const { plan } = req.body;

    if (!plan || !PRICE_IDS[plan]) {
      return res.status(400).json({ error: 'Invalid plan. Use "thinker" or "philosopher".' });
    }

    const user = await UserDB.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Already on this plan or higher
    if (user.plan === plan || user.plan === 'philosopher') {
      return res.status(400).json({ error: 'You already have this plan or higher.' });
    }

    // Get or create Stripe customer
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name || undefined,
        metadata: { userId: user.id.toString() }
      });
      customerId = customer.id;
      await UserDB.setStripeCustomer(user.id, customerId);
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || `https://${req.headers.host}`;
    const isSubscription = plan === 'thinker';

    const sessionParams = {
      customer: customerId,
      line_items: [{ price: PRICE_IDS[plan], quantity: 1 }],
      mode: isSubscription ? 'subscription' : 'payment',
      success_url: `${baseUrl}/dashboard?payment=success&plan=${plan}`,
      cancel_url: `${baseUrl}/#pricing`,
      metadata: { userId: user.id.toString(), plan },
      allow_promotion_codes: true,
    };

    // For one-time payments (philosopher), add payment_intent metadata
    if (!isSubscription) {
      sessionParams.payment_intent_data = {
        metadata: { userId: user.id.toString(), plan }
      };
    } else {
      sessionParams.subscription_data = {
        metadata: { userId: user.id.toString(), plan }
      };
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    return res.status(200).json({ url: session.url });

  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
