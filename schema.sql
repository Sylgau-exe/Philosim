-- PhiloSim Database Schema
-- Run this in Neon SQL Editor (https://console.neon.tech)

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  password_hash VARCHAR(255),
  is_admin BOOLEAN DEFAULT false,
  email_verified BOOLEAN DEFAULT false,
  verification_token VARCHAR(255),
  google_id VARCHAR(255),
  auth_provider VARCHAR(50) DEFAULT 'email',
  plan VARCHAR(50) DEFAULT 'free',
  reset_token VARCHAR(255),
  reset_token_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Make password_hash nullable for Google OAuth users
DO $$ BEGIN
  ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;
EXCEPTION WHEN others THEN NULL;
END $$;

-- Simulation sessions
CREATE TABLE IF NOT EXISTS simulation_sessions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  scenario_id VARCHAR(100) NOT NULL,
  scenario_title VARCHAR(255),
  language VARCHAR(10) DEFAULT 'en',
  check_score INTEGER DEFAULT 0,
  overall_score INTEGER DEFAULT 0,
  score_virtue INTEGER DEFAULT 0,
  score_reasoning INTEGER DEFAULT 0,
  score_self_aware INTEGER DEFAULT 0,
  score_epistemic INTEGER DEFAULT 0,
  strongest VARCHAR(255),
  weakest VARCHAR(255),
  decisions_json JSONB,
  completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin activity log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id SERIAL PRIMARY KEY,
  admin_id INTEGER REFERENCES users(id),
  action VARCHAR(100),
  details JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stripe columns (run these if upgrading from v5)
DO $$ BEGIN
  ALTER TABLE users ADD COLUMN stripe_customer_id VARCHAR(255);
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
DO $$ BEGIN
  ALTER TABLE users ADD COLUMN stripe_subscription_id VARCHAR(255);
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;
DO $$ BEGIN
  ALTER TABLE users ADD COLUMN plan_expires_at TIMESTAMP;
EXCEPTION WHEN duplicate_column THEN NULL;
END $$;

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user ON simulation_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_completed ON simulation_sessions(completed_at);
CREATE INDEX IF NOT EXISTS idx_users_stripe ON users(stripe_customer_id);

-- Verify tables
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
