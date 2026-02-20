const { sql } = require('@vercel/postgres');
const { verifyToken, cors } = require('../../lib/auth');

module.exports = async (req, res) => {
    // CORS
    if (cors(req, res)) return;

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Verify auth
        const user = verifyToken(req);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { philosopher_id } = req.body;

        if (!philosopher_id) {
            return res.status(400).json({ error: 'philosopher_id is required' });
        }

        const validPhilosophers = ['socrates', 'plato', 'aristotle', 'kant', 'nietzsche', 'beauvoir'];
        if (!validPhilosophers.includes(philosopher_id)) {
            return res.status(400).json({ error: 'Invalid philosopher_id' });
        }

        // Create table if not exists (safe to run multiple times)
        await sql`
            CREATE TABLE IF NOT EXISTS philosopher_interest (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                philosopher_id VARCHAR(50) NOT NULL,
                created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, philosopher_id)
            )
        `;

        // Insert interest (ignore duplicates)
        await sql`
            INSERT INTO philosopher_interest (user_id, philosopher_id)
            VALUES (${user.id}, ${philosopher_id})
            ON CONFLICT (user_id, philosopher_id) DO NOTHING
        `;

        return res.status(200).json({ 
            success: true, 
            message: `Interest registered for ${philosopher_id}` 
        });

    } catch (error) {
        console.error('Notify error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};
