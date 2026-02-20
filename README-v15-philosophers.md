# PhiloSim — Philosopher Selection (v15 Addition)

## New Files

### 1. `public/choose.html` — Philosopher Selection Page
Full standalone page with:
- Socrates card (active, links to /app)
- Plato, Kant, Nietzsche, Simone de Beauvoir cards (Coming Soon)
- "Notify Me" modal + toast confirmations
- Full bilingual EN/FR support
- Same sidebar, auth, and design system as other pages
- Responsive (mobile hamburger menu)

### 2. `api/notify.js` — Interest Collection Endpoint
- Authenticated endpoint (requires JWT)
- Creates `philosopher_interest` table automatically
- Stores user_id + philosopher_id (no duplicates)
- Query later to see demand per philosopher

### 3. `landing-philosophers-section.html` — Landing Page Snippet
- CSS, HTML section, and i18n translations to add to `index.html`
- Horizontal scrollable card carousel
- Shows all 5 philosophers as a preview
- Place between "phases" and "pricing" sections

---

## Integration Steps

### Step 1: Add route to `vercel.json`
Add this rewrite to your existing `rewrites` array:

```json
{ "source": "/choose", "destination": "/choose.html" }
```

### Step 2: Update navigation flow
After login/OAuth, redirect users to `/choose` instead of `/app`:
- In `api/auth/google/callback.js` — change redirect from `/app` to `/choose`
- In `index.html` login success handler — change redirect to `/choose`
- In `dashboard.html` — add "Choose Mentor" link to sidebar nav

### Step 3: Add landing page section
Open `index.html` and:
1. Add the CSS from `landing-philosophers-section.html` into your `<style>` tag
2. Add the HTML section between phases and pricing
3. Add the i18n keys to your existing translation objects

### Step 4: Deploy
```bash
git add .
git commit -m "v15: Philosopher selection page + landing preview + notify API"
git push
```

---

## Checking Interest Data (Admin)
```sql
-- See total interest per philosopher
SELECT philosopher_id, COUNT(*) as interest_count 
FROM philosopher_interest 
GROUP BY philosopher_id 
ORDER BY interest_count DESC;

-- See who's interested with emails
SELECT u.email, u.name, pi.philosopher_id, pi.created_at
FROM philosopher_interest pi
JOIN users u ON u.id = pi.user_id
ORDER BY pi.created_at DESC;
```

---

## Version
Tag this as **Philosim-main-v15** when packaging.
