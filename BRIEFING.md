# PhiloSim SaaS V6 — Transfer Briefing
## For continuation in new Claude chat

---

## PROJECT STATUS: READY FOR DEPLOYMENT

PhiloSim is a philosophy simulation platform for the BizSimHub marketplace.
V6 adds session persistence, Stripe payments, and plan gating to the complete SaaS app.

---

## WHAT'S NEW IN V6 (vs V5)

### 1. Session Save to Database
- `api/sessions/save.js` — POST endpoint, calls SessionDB.save() from lib/db.js
- `api/sessions/history.js` — GET endpoint, returns sessions + aggregate stats
- `app.html` — After localStorage save, also POSTs to /api/sessions/save if logged in
- `dashboard.html` — Loads sessions from API first, falls back to localStorage

### 2. Stripe Integration
- `api/stripe/checkout.js` — Creates Stripe checkout session (subscription or one-time)
- `api/stripe/webhook.js` — Handles checkout.completed, subscription renewal/cancel, payment failures
- `api/stripe/status.js` — Returns plan status + Stripe billing portal link for subscribers
- `index.html` — handleCTA() routes paid plans to Stripe checkout; pendingPlan flow for unauthenticated users
- `dashboard.html` — "Manage Subscription" button for Thinker subscribers (opens Stripe portal)
- `lib/db.js` — Added setStripeCustomer(), findByStripeCustomer(), updateStripeSubscription()
- `schema.sql` — Added stripe_customer_id, stripe_subscription_id, plan_expires_at columns

### 3. Plan Gating
- `app.html` — Loads userPlan from /api/auth/me; free users see scenario 2+ as locked with Premium badge
- Clicking locked scenario shows bilingual upgrade prompt, redirects to /#pricing
- Paid users (thinker/philosopher) get full access to all scenarios

---

## FULL FILE INVENTORY (27 files)

### Backend (16 API endpoints + 3 libs)
- `api/auth/login.js` — Email/password login with JWT
- `api/auth/register.js` — Registration with bcrypt + welcome email
- `api/auth/me.js` — Get current user (with session count)
- `api/auth/forgot-password.js` — Reset token + email via Resend
- `api/auth/reset-password.js` — Token validation + password update
- `api/auth/google/index.js` — OAuth redirect to Google
- `api/auth/google/callback.js` — OAuth callback, create/link user
- `api/admin/stats.js` — Dashboard statistics
- `api/admin/users.js` — User list with session data
- `api/admin/edit-user.js` — Edit user details, plan, admin toggle
- `api/admin/delete-user.js` — Delete user with cascade
- `api/sessions/save.js` — Save simulation session to DB (V6)
- `api/sessions/history.js` — Get user sessions + stats from DB (V6)
- `api/stripe/checkout.js` — Create Stripe checkout session (V6)
- `api/stripe/webhook.js` — Handle Stripe payment events (V6)
- `api/stripe/status.js` — Subscription status + billing portal (V6)
- `api/health.js` — Health check
- `lib/auth.js` — JWT helpers, CORS, middleware
- `lib/db.js` — UserDB + SessionDB (with Stripe methods)
- `lib/email.js` — Resend service (reset + welcome emails)

### Frontend (4 pages)
- `public/index.html` — Landing page with auth modal + Stripe checkout flow
- `public/dashboard.html` — User dashboard (API sessions + Stripe manage)
- `public/admin.html` — Admin dashboard (user management)
- `public/app.html` — Full simulation (DB save + plan gating)
- `public/socrates.png` — Socrates portrait (98KB)

### Config
- `schema.sql` — PostgreSQL schema (users + sessions + admin_log + Stripe columns)
- `package.json` — Dependencies (v6.0.0, includes stripe)
- `vercel.json` — Rewrites + webhook function config
- `BRIEFING.md` — This file

---

## ARCHITECTURE

```
philosim-saas/
├── api/
│   ├── auth/
│   │   ├── login.js, register.js, me.js
│   │   ├── forgot-password.js, reset-password.js
│   │   └── google/ (index.js, callback.js)
│   ├── admin/
│   │   ├── stats.js, users.js, edit-user.js, delete-user.js
│   ├── sessions/          ← V6
│   │   ├── save.js, history.js
│   ├── stripe/            ← V6
│   │   ├── checkout.js, webhook.js, status.js
│   └── health.js
├── lib/ (auth.js, db.js, email.js)
├── public/ (index.html, dashboard.html, admin.html, app.html, socrates.png)
├── schema.sql, package.json, vercel.json
```

## REQUIRED ENVIRONMENT VARIABLES

| Variable | Description |
|----------|-------------|
| `POSTGRES_URL` | Neon connection string |
| `JWT_SECRET` | Random string for token signing |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `GOOGLE_REDIRECT_URI` | `https://yourdomain.com/api/auth/google/callback` |
| `RESEND_API_KEY` | From resend.com |
| `FROM_EMAIL` | `PhiloSim <noreply@yourdomain.com>` |
| `ADMIN_EMAIL` | `sgauthier@executiveproducer.ca` |
| `STRIPE_SECRET_KEY` | From Stripe Dashboard (sk_live_...) |
| `STRIPE_WEBHOOK_SECRET` | From Stripe webhook endpoint (whsec_...) |
| `STRIPE_PRICE_THINKER` | Price ID for $19/mo subscription (price_...) |
| `STRIPE_PRICE_PHILOSOPHER` | Price ID for $149 lifetime (price_...) |
| `NEXT_PUBLIC_URL` | Your domain (https://philosim.app) |

---

## STRIPE SETUP CHECKLIST

1. Create products in Stripe Dashboard:
   - Product: "PhiloSim Thinker" → Price: $19 CAD/month (recurring)
   - Product: "PhiloSim Philosopher" → Price: $149 CAD (one-time)
   - Copy both Price IDs to env vars

2. Create webhook endpoint in Stripe Dashboard:
   - URL: `https://yourdomain.com/api/stripe/webhook`
   - Events: checkout.session.completed, invoice.payment_succeeded, invoice.payment_failed, customer.subscription.deleted
   - Copy webhook signing secret to STRIPE_WEBHOOK_SECRET

3. Enable Customer Portal in Stripe Dashboard:
   - Settings → Billing → Customer portal
   - Allow customers to cancel subscriptions

4. Test with Stripe test mode first (pk_test_ / sk_test_)

---

## DATABASE MIGRATION (if upgrading from V5)

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_customer_id VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS stripe_subscription_id VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS plan_expires_at TIMESTAMP;
CREATE INDEX IF NOT EXISTS idx_users_stripe ON users(stripe_customer_id);
```

Or just run the full schema.sql (handles both fresh install and migration).

---

## DESIGN SYSTEM

- Dark theme: #05050a background, #141420 cards
- Gold accent: #d4a853 (Socrates' wisdom color)
- Purple: #6366f1 (secondary)
- Fonts: Space Grotesk (headings), DM Sans (body)
- Bilingual: Everything in EN/FR

## PRICING MODEL

| Plan | Price | Access |
|------|-------|--------|
| Explorer | $0 | 1 scenario (The Ethical Dilemma) |
| Thinker | $19/mo | All mentors & scenarios |
| Philosopher | $149 lifetime | Everything + future content |

---

## WHAT'S LEFT (OPTIONAL ENHANCEMENTS)

1. Email confirmation on registration
2. PDF report export
3. Additional philosophers (Plato, Kant, Nietzsche)
4. Team/classroom features for Philosopher plan
5. Stripe coupon codes (allow_promotion_codes already enabled in checkout)

---

## KEY INSTRUCTION FOR NEXT CHAT

Tell Claude: "I'm continuing PhiloSim SaaS development. I have the V6 package. Please read the BRIEFING.md file first, then help me with [specific task]."

Built with Sylvain's custom saas-starter-kit skill (Vercel + Neon boilerplate).
