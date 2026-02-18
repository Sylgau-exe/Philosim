// api/sessions/save.js - Save simulation session to database
import { requireAuth, cors } from '../../lib/auth.js';
import { SessionDB } from '../../lib/db.js';

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const decoded = await requireAuth(req, res);
  if (!decoded) return;

  try {
    const { scenarioId, scenarioTitle, language, checkScore, overall, virtue, reasoning, selfAware, epistemic, strongest, weakest, decisions } = req.body;

    if (!scenarioId || overall === undefined) {
      return res.status(400).json({ error: 'Missing required fields: scenarioId, overall' });
    }

    const session = await SessionDB.save(decoded.userId, {
      scenarioId,
      scenarioTitle: scenarioTitle || scenarioId,
      language: language || 'en',
      checkScore: checkScore || 0,
      overall: overall || 0,
      virtue: virtue || 0,
      reasoning: reasoning || 0,
      selfAware: selfAware || 0,
      epistemic: epistemic || 0,
      strongest: strongest || '',
      weakest: weakest || '',
      decisions: decisions || []
    });

    return res.status(200).json({ success: true, session });
  } catch (error) {
    console.error('Save session error:', error);
    return res.status(500).json({ error: 'Failed to save session' });
  }
}
