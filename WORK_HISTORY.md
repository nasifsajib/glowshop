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

### 📝 Next Up
- [ ] Deploy to Vercel (push current code to GitHub, Vercel auto-deploys)
- [ ] Migrate image/video uploads from base64 to Supabase Storage
- [ ] Buy domain (glowshop.com) or use vercel.app
- [ ] Set up email marketing (MailerLite + Resend)
- [ ] Add payment gateway (Stripe)
