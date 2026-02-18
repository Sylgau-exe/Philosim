// api/admin/users.js - List all users
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
    const result = await sql`
      SELECT 
        u.id, u.name, u.email, u.plan,
        u.auth_provider, u.is_admin, u.created_at,
        COALESCE(s.session_count, 0) as sessions,
        s.last_session, s.avg_score, s.best_score
      FROM users u
      LEFT JOIN (
        SELECT user_id, COUNT(*) as session_count, 
               MAX(completed_at) as last_session,
               ROUND(AVG(overall_score)::numeric, 0) as avg_score,
               MAX(overall_score) as best_score
        FROM simulation_sessions GROUP BY user_id
      ) s ON u.id = s.user_id
      ORDER BY u.created_at DESC
    `;
    const users = result.rows.map(r => ({
      id: r.id, name: r.name, email: r.email,
      plan: r.plan || 'free', authProvider: r.auth_provider || 'email',
      isAdmin: r.is_admin || false,
      sessions: parseInt(r.sessions), avgScore: parseInt(r.avg_score) || 0,
      bestScore: parseInt(r.best_score) || 0,
      lastSession: r.last_session ? new Date(r.last_session).toLocaleDateString() : 'Never',
      joined: new Date(r.created_at).toLocaleDateString()
    }));
    return res.json({ users, total: users.length });
  } catch (error) {
    console.error('Admin users error:', error);
    return res.status(500).json({ error: 'Failed to fetch users' });
  }
}
