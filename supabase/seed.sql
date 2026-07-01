-- ============================================
-- GlowShop Seed Data
-- Run AFTER migration.sql
-- ============================================

-- Categories
INSERT INTO categories (name, image, item_count) VALUES
  ('Skincare', '/images/skincare.jpg', 245),
  ('Makeup', '/images/makeup.jpg', 189),
  ('Hair Care', '/images/haircare.jpg', 134),
  ('Body Care', '/images/bodycare.jpg', 98),
  ('Sunscreen', '/images/sunscreen.jpg', 67),
  ('Fragrance', '/images/fragrance.jpg', 112),
  ('Korean Beauty', '/images/kbeauty.jpg', 203);

-- Brands
INSERT INTO brands (name, logo, description) VALUES
  ('GlowLab', '/images/glowlab.png', 'Premium Korean skincare'),
  ('DewySkin', '/images/dewyskin.png', 'Hydration experts'),
  ('PureGlow', '/images/pureglow.png', 'Clean beauty'),
  ('VelvetTouch', '/images/velvettouch.png', 'Luxury makeup'),
  ('BloomEssentials', '/images/bloom.png', 'Natural ingredients'),
  ('RadianceCo', '/images/radiance.png', 'Brightening solutions');
