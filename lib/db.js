// lib/db.js - Database helper for PhiloSim
import { sql } from '@vercel/postgres';

export const UserDB = {
  async create(email, passwordHash, name, utm = {}) {
    const result = await sql`
      INSERT INTO users (email, password_hash, name, auth_provider, utm_source, utm_medium, utm_campaign)
      VALUES (${email}, ${passwordHash}, ${name}, 'email', ${utm.source || null}, ${utm.medium || null}, ${utm.campaign || null})
      RETURNING *
    `;
    return result.rows[0];
  },

  async createGoogleUser(email, name, googleId, utm = {}) {
    const result = await sql`
      INSERT INTO users (email, name, google_id, auth_provider, email_verified, utm_source, utm_medium, utm_campaign)
      VALUES (${email}, ${name}, ${googleId}, 'google', true, ${utm.source || null}, ${utm.medium || null}, ${utm.campaign || null})
      RETURNING *
    `;
    return result.rows[0];
  },

  async linkGoogleAccount(userId, googleId) {
    const result = await sql`
      UPDATE users SET google_id = ${googleId}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
      RETURNING *
    `;
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    return result.rows[0] || null;
  },

  async findById(id) {
    const result = await sql`SELECT * FROM users WHERE id = ${id}`;
    return result.rows[0] || null;
  },

  async setResetToken(email, token, expiresAt) {
    const result = await sql`
      UPDATE users SET
        reset_token = ${token},
        reset_token_expires = ${expiresAt},
        updated_at = CURRENT_TIMESTAMP
      WHERE email = ${email}
      RETURNING *
    `;
    return result.rows[0];
  },

  async findByResetToken(token) {
    const result = await sql`
      SELECT * FROM users 
      WHERE reset_token = ${token} 
        AND reset_token_expires > CURRENT_TIMESTAMP
    `;
    return result.rows[0] || null;
  },

  async updatePassword(id, passwordHash) {
    const result = await sql`
      UPDATE users SET
        password_hash = ${passwordHash},
        reset_token = NULL,
        reset_token_expires = NULL,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  },

  async updatePlan(id, plan) {
    const result = await sql`
      UPDATE users SET plan = ${plan}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  },

  async setStripeCustomer(id, stripeCustomerId) {
    const result = await sql`
      UPDATE users SET stripe_customer_id = ${stripeCustomerId}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  },

  async findByStripeCustomer(stripeCustomerId) {
    const result = await sql`SELECT * FROM users WHERE stripe_customer_id = ${stripeCustomerId}`;
    return result.rows[0] || null;
  },

  async updateStripeSubscription(id, subscriptionId, plan, expiresAt) {
    const result = await sql`
      UPDATE users SET 
        stripe_subscription_id = ${subscriptionId},
        plan = ${plan},
        plan_expires_at = ${expiresAt},
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${id}
      RETURNING *
    `;
    return result.rows[0];
  }
};

export const SessionDB = {
  async save(userId, data) {
    const result = await sql`
      INSERT INTO simulation_sessions 
        (user_id, scenario_id, scenario_title, language, check_score, 
         overall_score, score_virtue, score_reasoning, score_self_aware, score_epistemic,
         strongest, weakest, decisions_json)
      VALUES 
        (${userId}, ${data.scenarioId}, ${data.scenarioTitle}, ${data.language},
         ${data.checkScore}, ${data.overall}, ${data.virtue}, ${data.reasoning},
         ${data.selfAware}, ${data.epistemic}, ${data.strongest}, ${data.weakest},
         ${JSON.stringify(data.decisions)})
      RETURNING *
    `;
    return result.rows[0];
  },

  async getByUser(userId) {
    const result = await sql`
      SELECT * FROM simulation_sessions 
      WHERE user_id = ${userId} 
      ORDER BY completed_at DESC
    `;
    return result.rows;
  },

  async getStats(userId) {
    const result = await sql`
      SELECT 
        COUNT(*) as total,
        ROUND(AVG(overall_score)::numeric, 0) as avg_score,
        MAX(overall_score) as best_score,
        MAX(completed_at) as last_session
      FROM simulation_sessions WHERE user_id = ${userId}
    `;
    return result.rows[0];
  }
};
