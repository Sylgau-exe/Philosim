// api/stripe/status.js - Check user's subscription status
import Stripe from 'stripe';
import { requireAuth, cors } from '../../lib/auth.js';
import { UserDB } from '../../lib/db.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const decoded = await requireAuth(req, res);
  if (!decoded) return;

  try {
    const user = await UserDB.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const status = {
      plan: user.plan || 'free',
      expiresAt: user.plan_expires_at || null,
      hasStripe: !!user.stripe_customer_id,
      canManage: false,
      portalUrl: null
    };

    // Create Stripe billing portal link for active subscribers
    if (user.stripe_customer_id && user.plan === 'thinker') {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_URL || `https://${req.headers.host}`;
        const portal = await stripe.billingPortal.sessions.create({
          customer: user.stripe_customer_id,
          return_url: `${baseUrl}/dashboard`
        });
        status.canManage = true;
        status.portalUrl = portal.url;
      } catch (e) {
        console.warn('Could not create portal session:', e.message);
      }
    }

    return res.status(200).json(status);
  } catch (error) {
    console.error('Stripe status error:', error);
    return res.status(500).json({ error: 'Failed to check status' });
  }
}
