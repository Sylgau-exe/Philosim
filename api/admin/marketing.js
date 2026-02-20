// api/admin/marketing.js - Marketing analytics for campaign tracking
import { sql } from '@vercel/postgres';
import { getUserFromRequest, cors } from '../../lib/auth.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const decoded = getUserFromRequest(req);
  if (!decoded) return res.status(401).json({ error: 'Authentication required' });

  const adminCheck = await sql`SELECT is_admin FROM users WHERE id = ${decoded.userId}`;
  if (!adminCheck.rows[0]?.is_admin) return res.status(403).json({ error: 'Admin access required' });

  try {
    // Funnel: Total users → Paid users
    const totalUsers = await sql`SELECT COUNT(*) as count FROM users`;
    const paidUsers = await sql`SELECT COUNT(*) as count FROM users WHERE plan != 'free' AND plan IS NOT NULL`;
    const thinkerCount = await sql`SELECT COUNT(*) as count FROM users WHERE plan = 'thinker'`;
    const philosopherCount = await sql`SELECT COUNT(*) as count FROM users WHERE plan = 'philosopher'`;

    // Registrations over time (last 30 days, grouped by day)
    const regsByDay = await sql`
      SELECT DATE(created_at) as day, COUNT(*) as count
      FROM users
      WHERE created_at > NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY day DESC
    `;

    // UTM campaign breakdown
    let campaignBreakdown = { rows: [] };
    try {
      campaignBreakdown = await sql`
        SELECT 
          COALESCE(utm_source, 'direct') as source,
          COALESCE(utm_medium, '—') as medium,
          COALESCE(utm_campaign, '—') as campaign,
          COUNT(*) as signups,
          SUM(CASE WHEN plan != 'free' AND plan IS NOT NULL THEN 1 ELSE 0 END) as conversions
        FROM users
        GROUP BY utm_source, utm_medium, utm_campaign
        ORDER BY signups DESC
      `;
    } catch(e) {}

    // Revenue estimate
    const revenue = {
      thinker: parseInt(thinkerCount.rows[0].count) * 19,
      philosopher: parseInt(philosopherCount.rows[0].count) * 149,
    };
    revenue.total = revenue.thinker + revenue.philosopher;
    revenue.marina80 = Math.round(revenue.total * 0.80);

    // Philosopher interest (notify me clicks)
    let philosopherInterest = { rows: [] };
    try {
      philosopherInterest = await sql`
        SELECT philosopher_id, COUNT(*) as interest_count
        FROM philosopher_interest
        GROUP BY philosopher_id
        ORDER BY interest_count DESC
      `;
    } catch(e) {}

    // Auth provider breakdown
    const authBreakdown = await sql`
      SELECT auth_provider, COUNT(*) as count
      FROM users
      GROUP BY auth_provider
      ORDER BY count DESC
    `;

    // Recent registrations (last 10)
    const recentSignups = await sql`
      SELECT name, email, auth_provider, utm_source, utm_campaign, created_at, plan
      FROM users
      ORDER BY created_at DESC
      LIMIT 10
    `;

    return res.json({
      funnel: {
        totalUsers: parseInt(totalUsers.rows[0].count),
        paidUsers: parseInt(paidUsers.rows[0].count),
        thinkers: parseInt(thinkerCount.rows[0].count),
        philosophers: parseInt(philosopherCount.rows[0].count),
        conversionRate: parseInt(totalUsers.rows[0].count) > 0 
          ? ((parseInt(paidUsers.rows[0].count) / parseInt(totalUsers.rows[0].count)) * 100).toFixed(1) 
          : '0.0',
      },
      revenue,
      regsByDay: regsByDay.rows,
      campaigns: campaignBreakdown.rows,
      philosopherInterest: philosopherInterest.rows,
      authBreakdown: authBreakdown.rows,
      recentSignups: recentSignups.rows,
    });
  } catch (error) {
    console.error('Marketing stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch marketing stats' });
  }
}
