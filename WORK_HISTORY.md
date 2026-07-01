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

### 📝 Next Up
- [ ] Initialize git remote and push to GitHub
- [ ] Deploy to Vercel
- [ ] Set up Supabase (DB, auth, storage)
- [ ] Connect admin login to real auth
- [ ] Connect product CRUD to database
- [ ] Replace base64 image/video upload with cloud storage
- [ ] Buy domain (glowshop.com) or use vercel.app
- [ ] Set up email marketing (MailerLite + Resend)
- [ ] Add payment gateway (Stripe)
