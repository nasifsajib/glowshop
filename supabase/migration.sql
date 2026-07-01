-- ============================================
-- GlowShop Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. CATEGORIES
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  image TEXT,
  item_count INTEGER DEFAULT 0
);

-- 2. BRANDS
CREATE TABLE brands (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  logo TEXT,
  description TEXT
);

-- 3. PRODUCTS
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT DEFAULT '',
  description TEXT DEFAULT '',
  ingredients TEXT DEFAULT '',
  benefits TEXT[] DEFAULT '{}',
  how_to_use TEXT DEFAULT '',
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  discount INTEGER DEFAULT 0,
  rating DECIMAL(3,1) DEFAULT 4.0,
  review_count INTEGER DEFAULT 0,
  images TEXT[] DEFAULT '{}',
  videos TEXT[] DEFAULT '{}',
  skin_type TEXT[] DEFAULT '{}',
  product_type TEXT DEFAULT '',
  stock INTEGER DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  is_best_seller BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  is_flash_sale BOOLEAN DEFAULT false,
  flash_sale_ends TIMESTAMP,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. USERS (profiles, extends Supabase Auth)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  phone TEXT,
  avatar TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. ADDRESSES
CREATE TABLE addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  zip TEXT NOT NULL,
  phone TEXT,
  is_default BOOLEAN DEFAULT false
);

-- 6. ORDERS
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  items JSONB NOT NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','confirmed','shipped','delivered','cancelled')),
  address_id UUID REFERENCES addresses(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. REVIEWS
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  user_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. BLOG POSTS
CREATE TABLE blog_posts (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT DEFAULT '',
  image TEXT DEFAULT '',
  author TEXT DEFAULT '',
  date TEXT DEFAULT '',
  category TEXT DEFAULT '',
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Blog posts public read" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Blog posts admin all" ON blog_posts FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Products: public read, admin only write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products public read" ON products FOR SELECT USING (true);
CREATE POLICY "Products admin insert" ON products FOR INSERT WITH CHECK (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Products admin update" ON products FOR UPDATE USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Products admin delete" ON products FOR DELETE USING (auth.jwt() ->> 'role' = 'admin');

-- Categories: public read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories public read" ON categories FOR SELECT USING (true);
CREATE POLICY "Categories admin all" ON categories FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Brands: public read
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Brands public read" ON brands FOR SELECT USING (true);
CREATE POLICY "Brands admin all" ON brands FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Profiles: users can read/update own
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Profiles read own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles update own" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles admin all" ON profiles FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Addresses: users can CRUD own
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Addresses user own" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Orders: users can read own, admin all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Orders read own" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Orders admin all" ON orders FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Orders insert own" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Reviews: public read, users insert own
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Reviews public read" ON reviews FOR SELECT USING (true);
CREATE POLICY "Reviews insert own" ON reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
