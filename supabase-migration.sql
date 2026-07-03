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
  address JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

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
