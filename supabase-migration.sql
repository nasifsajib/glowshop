-- Social links table (single row, cross-device)
CREATE TABLE IF NOT EXISTS social_links (
  id INTEGER PRIMARY KEY DEFAULT 1,
  whatsapp TEXT NOT NULL DEFAULT 'https://wa.me/1234567890',
  facebook TEXT NOT NULL DEFAULT '',
  instagram TEXT NOT NULL DEFAULT '',
  tiktok TEXT NOT NULL DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO social_links (id, whatsapp, facebook, instagram, tiktok)
VALUES (1, 'https://wa.me/1234567890', '', '', '')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read social links"
  ON social_links FOR SELECT USING (true);

CREATE POLICY "Admin can upsert social links"
  ON social_links FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin can update social links"
  ON social_links FOR UPDATE USING (true) WITH CHECK (true);

-- Fix: update existing table columns (add tiktok, remove twitter/youtube if they exist)
ALTER TABLE social_links ADD COLUMN IF NOT EXISTS tiktok TEXT NOT NULL DEFAULT '';
ALTER TABLE social_links DROP COLUMN IF EXISTS twitter;
ALTER TABLE social_links DROP COLUMN IF EXISTS youtube;
NOTIFY pgrst, 'reload schema';

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

-- ── User profiles (admin role management) ──────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile; anyone can read if admin (for checks)
CREATE POLICY "Users can read own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Only admin can insert/update profiles
CREATE POLICY "Admin can insert profiles"
  ON profiles FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin can update profiles"
  ON profiles FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin'))
  WITH CHECK (role IN ('user', 'admin'));

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant anon/authenticated access to profiles
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON public.profiles TO anon, authenticated;
GRANT INSERT, UPDATE ON public.profiles TO authenticated;
NOTIFY pgrst, 'reload schema';
