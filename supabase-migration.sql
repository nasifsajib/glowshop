-- Social links table (single row, cross-device)
CREATE TABLE IF NOT EXISTS social_links (
  id INTEGER PRIMARY KEY DEFAULT 1,
  whatsapp TEXT NOT NULL DEFAULT 'https://wa.me/1234567890',
  facebook TEXT NOT NULL DEFAULT '#',
  instagram TEXT NOT NULL DEFAULT '#',
  twitter TEXT NOT NULL DEFAULT '#',
  youtube TEXT NOT NULL DEFAULT '#',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO social_links (id, whatsapp, facebook, instagram, twitter, youtube)
VALUES (1, 'https://wa.me/1234567890', '#', '#', '#', '#')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read social links"
  ON social_links FOR SELECT USING (true);

CREATE POLICY "Admin can upsert social links"
  ON social_links FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update social links"
  ON social_links FOR UPDATE USING (true) WITH CHECK (true);

-- Create orders table for cross-device order sync
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_email TEXT NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  date TEXT NOT NULL,
  address JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Fix: add address column if the table was created without it
ALTER TABLE orders ADD COLUMN IF NOT EXISTS address JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Allow anonymous insert (any logged-in user can create an order)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Anyone can insert orders
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Anyone can read orders (for simplicity; admin + own orders)
CREATE POLICY "Anyone can read orders"
  ON orders FOR SELECT
  USING (true);

-- Anyone can update orders (admin can change status)
CREATE POLICY "Anyone can update orders"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);
