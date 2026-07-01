# GlowShop — Work History

## 2026-07-01

### ✅ Done
- Initialized Next.js 16 + TypeScript + Tailwind CSS v4 project
- Installed Framer Motion, Lucide Icons, Radix UI, tailwind-merge, class-variance-authority
- Set up global CSS theme (light/dark mode, custom properties)
- Created reusable UI components: Button, Card, Badge, Input, Skeleton, Separator, Toast, Tabs, Accordion
- Built types (`Product`, `CartItem`, `Review`, `Category`, `Brand`, `User`, `Order`, `Address`)
- Built state management (`AppProvider` / `useApp` with Context + useReducer + localStorage)
- Created 35 dummy products, 7 categories, 6 brands, 8 reviews, 4 blog posts
- Built SVG placeholder images for categories, brands, and blog
- Configured Next.js Image remotePatterns (picsum.photos for product images)

### Pages Built
- `/` — Homepage with 12 sections (hero carousel, categories, featured products, flash sale w/ countdown timer, coupon banners, best sellers, new arrivals, trending, brands, reviews, blog)
- `/products` — Product listing with filters (category, brand, price, skin type, rating) and sorting
- `/products/[slug]` — Product detail page (image gallery, ingredients, benefits, how-to-use, reviews w/ rating breakdown, related products, frequently bought together)
- `/cart` — Shopping cart with quantity controls, coupon input, order summary
- `/wishlist` — Wishlist page
- `/login` — User login
- `/register` — User registration
- `/forgot-password` — Password reset UI
- `/profile` — User profile
- `/orders` — Order history
- `/addresses` — Address book (add, remove, set default)
- `/admin/login` — Admin login (`admin@glowshop.com` / `admin123`)
- `/admin` — Admin dashboard with stats
- `/admin/products` — Product management (list, search, sort, delete)
- `/admin/products/new` — Add product form (custom brand/category/productType, image + video upload via FileReader/base64)
- `/admin/products/[id]/edit` — Edit product form

### Fixed
- Hydration error in CountdownTimer (moved to client-only useEffect)
- Dark mode hydration mismatch (mounted guard + store initializer refactor)
- Store hydration overwriting admin user (dedicated `glowshop-admin` localStorage key)
- Admin login whitespace trimming
- Changed brand/category/productType from `<select>` to `<input>` with `<datalist>` for custom values

### ✅ Done (continued)
- Pushed entire project to GitHub: https://github.com/nasifsajib/glowshop

### ✅ Done
- Set up Supabase DB with tables, RLS policies, and seed data (categories, brands, 35 products, 8 reviews, 4 blog posts)
- Created API layer (`src/lib/api.ts`) with functions: fetchProducts, fetchCategories, fetchBrands, fetchReviews, fetchBlogPosts, createProduct, updateProduct, deleteProduct
- Updated store to load all data from Supabase on mount instead of hardcoded data.ts
- Updated all 14 components/pages that imported from `data.ts` to use store state instead
- Updated admin login to use Supabase Auth (`supabase.auth.signInWithPassword`)
- Updated admin product CRUD (create, update, delete) to write to Supabase DB
- Fixed type issues: added `slug` field to Product type, fixed Review mapper
- Added real Unsplash beauty images to Hero Banner (3 slides), Shop by Brand (6 brands), Categories (7 categories), Blog (4 posts)
- Added fallback hardcoded data so site works without Supabase env vars configured
- Deployed to Vercel at https://glowshop-beige.vercel.app

## 2026-07-02

### ✅ Fixed
- **Admin login broken on Vercel** — Two bugs in `src/lib/supabase.ts` and `src/app/admin/login/page.tsx`:
  1. Supabase client (`createClient`) crashed on init when `NEXT_PUBLIC_SUPABASE_*` env vars were missing on Vercel, killing the entire JS bundle. Fixed by checking for env vars before initializing; exports a mock client when they're absent.
  2. Added local credential fallback — if Supabase Auth isn't available, falls back to checking `admin@glowshop.com` / `admin123` locally.
- **Images not loading on Vercel** — Two bugs in `src/lib/store.tsx`:
  1. **Pre-populated `initialState` with fallback data** — categories, brands, products, reviews, and blogPosts now start with fallback data instead of empty arrays, so sections render immediately with images on first load.
  2. **Preserve fallback when Supabase returns empty arrays** — The `SET_INITIAL_DATA` reducer only replaces each data field if the incoming array is non-empty. If Supabase tables exist but contain no rows, the fallback data is kept instead of being overwritten with `[]`.

### 🔴 Still Broken
- **Admin login — clicking Sign In does nothing on Vercel.** Even with the supabase guard and local fallback, the button has no effect. Suspected causes:
  - `framer-motion` wrapping `<motion.div>` around the form causing React hydration to fail silently (event handlers not attached)
  - Supabase Auth `signInWithPassword` with invalid anon key returning 401 and blocking the handler
  - **2026-07-02 fix**: Removed framer-motion `motion.div` wrapper, removed Supabase auth call entirely, made `handleLogin` synchronous with `useCallback` — now only uses local credential check.

### 📝 Next Up
- [ ] Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars in Vercel dashboard for live Supabase data
- [ ] Buy domain (glowshop.com) and point to Vercel
- [ ] Migrate image/video uploads from base64 to Supabase Storage
- [ ] Set up email marketing (MailerLite + Resend)
- [ ] Add payment gateway (Stripe)
