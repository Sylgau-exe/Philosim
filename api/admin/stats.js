// api/admin/stats.js - PhiloSim admin dashboard statistics
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
    const userCount = await sql`SELECT COUNT(*) as count FROM users`;
    let sessionCount = { rows: [{ count: 0 }] };
    let avgScore = { rows: [{ avg: 0 }] };
    let newUsers7d = { rows: [{ count: 0 }] };
    let sessions7d = { rows: [{ count: 0 }] };
    let planDist = { rows: [] };
    let scenarioDist = { rows: [] };

    try { sessionCount = await sql`SELECT COUNT(*) as count FROM simulation_sessions`; } catch(e) {}
    try { avgScore = await sql`SELECT ROUND(AVG(overall_score)::numeric, 1) as avg FROM simulation_sessions`; } catch(e) {}
    try { newUsers7d = await sql`SELECT COUNT(*) as count FROM users WHERE created_at > NOW() - INTERVAL '7 days'`; } catch(e) {}
    try { sessions7d = await sql`SELECT COUNT(*) as count FROM simulation_sessions WHERE completed_at > NOW() - INTERVAL '7 days'`; } catch(e) {}
    try { planDist = await sql`SELECT plan, COUNT(*) as count FROM users GROUP BY plan ORDER BY count DESC`; } catch(e) {}
    try { scenarioDist = await sql`SELECT scenario_id, scenario_title, COUNT(*) as count, ROUND(AVG(overall_score)::numeric,0) as avg_score FROM simulation_sessions GROUP BY scenario_id, scenario_title ORDER BY count DESC`; } catch(e) {}

    return res.json({
      overview: {
        totalUsers: parseInt(userCount.rows[0].count) || 0,
        totalSessions: parseInt(sessionCount.rows[0].count) || 0,
        avgScore: parseFloat(avgScore.rows[0]?.avg) || 0,
      },
      last7Days: {
        newUsers: parseInt(newUsers7d.rows[0].count) || 0,
        sessions: parseInt(sessions7d.rows[0].count) || 0,
      },
      planDistribution: planDist.rows,
      scenarioStats: scenarioDist.rows,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return res.status(500).json({ error: 'Failed to fetch stats' });
  }
}
