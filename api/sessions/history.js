// api/sessions/history.js - Get user's session history from database
import { requireAuth, cors } from '../../lib/auth.js';
import { SessionDB } from '../../lib/db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const decoded = await requireAuth(req, res);
  if (!decoded) return;

  try {
    const sessions = await SessionDB.getByUser(decoded.userId);
    const stats = await SessionDB.getStats(decoded.userId);

    return res.status(200).json({
      sessions: sessions.map(s => ({
        id: s.id,
        scenarioId: s.scenario_id,
        scenarioTitle: s.scenario_title,
        language: s.language,
        checkScore: s.check_score,
        overall: s.overall_score,
        virtue: s.score_virtue,
        reasoning: s.score_reasoning,
        selfAware: s.score_self_aware,
        epistemic: s.score_epistemic,
        strongest: s.strongest,
        weakest: s.weakest,
        decisions: s.decisions_json,
        date: s.completed_at
      })),
      stats: {
        total: parseInt(stats.total) || 0,
        avgScore: parseInt(stats.avg_score) || 0,
        bestScore: parseInt(stats.best_score) || 0,
        lastSession: stats.last_session
      }
    });
  } catch (error) {
    console.error('Session history error:', error);
    return res.status(500).json({ error: 'Failed to fetch sessions' });
  }
}
