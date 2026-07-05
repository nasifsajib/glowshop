> **SESSION STARTUP INSTRUCTION:** Read this entire file first — it contains all project context, credentials, architecture decisions, and pending work. Do not make assumptions about the codebase without consulting this file.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:work-history -->

> **READ THIS FIRST when starting a new session.** This file contains all context, credentials, decisions, and next steps from previous sessions.

## Commands

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Production build + TypeScript check
npm run lint         # Lint check (if available)
```

Deploy is automatic — push to `main` on GitHub, Vercel auto-deploys.

## User Preferences

- Prefers concise, direct answers. No emojis unless asked.
- Wants to see the site working before pushing changes.
- Likes bullet-point summaries of what was done.
- English is not their first language — keep responses simple and clear.

## Critical Credentials

- **Supabase Project URL:** `https://lokchhaitjizdgqfujir.supabase.co`
- **Supabase Anon Key (publishable):** `sb_publishable_YTd9ZOjsscO7w_66Gyo4KA_kEQ_hOjg`
- **Admin login:** Uses `profiles` table in Supabase (role column). No hardcoded password.
  - **Admin user:** `glowshop69@gmail.com` (manually created in Supabase Auth, profile set to `role: 'admin'` via SQL).
  - Old hardcoded fallback (`admin123`) has been removed.
- **Email confirmation:** DISABLED in Supabase Auth settings (users can sign up and are immediately logged in)
- **Vercel project:** `glowshop-beige` on `vercel.com/nasifsajibs-projects`
- **Custom domain (if any):** none yet, uses `glowshop-beige.vercel.app`
- **Vercel env vars to NEVER set:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` — must NOT exist in Vercel, because old invalid key was overriding the hardcoded correct key
- **WhatsApp number:** currently default `https://wa.me/1234567890` — edit in admin dashboard

## Design System & UI Patterns

- **Color scheme**: Uses CSS variables from `globals.css` — `primary`, `secondary`, `accent`, `muted`, `card`, `background`, `foreground`, `border`
- **Shadcn/ui components**: Located in `src/components/ui/`. Use `Button`, `Input`, `Label`, `Separator`, `Card`, `Badge`, `Sheet`, `Tabs`, `Select`, `Dialog`, etc.
- **Button variants**: `premium` (gradient primary), `default`, `outline`, `ghost`, `destructive`
- **Icons**: `lucide-react` for UI icons, `react-icons/fa` (Font Awesome) for brand icons (Facebook, Instagram, TikTok, WhatsApp)
- **Typography**: `font-heading` class for headings, `font-sans` for body. Heading sizes: `text-2xl sm:text-3xl font-bold` for page titles
- **Layout**: `container mx-auto px-4 py-6 sm:py-8` for page wrappers. Cards use `p-6 rounded-2xl border bg-card`
- **Toast notifications**: `import { toast } from "@/hooks/use-toast"` — usage: `toast({ title: "...", description: "...", variant: "success" | "error" })`
- **Price formatting**: `import { formatPrice } from "@/lib/utils"` — always use this, never raw `$` strings
- **Cart/wishlist buttons**: "Add to Cart" is `Button variant="premium"`, "Buy Now" is `Button variant="outline"`
- **Form patterns**: Inputs inside `.relative` divs with lucide icons positioned absolutely at `left-3 top-1/2 -translate-y-1/2`. Password fields have show/hide toggle at `right-3`.
- **Loading states**: Skeleton uses `animate-pulse bg-muted rounded` with appropriate dimensions
- **Auth pages** (login/register/forgot-password): NO framer-motion `motion.div` wrappers — they break form submission. Wrap `useSearchParams` usage in `<Suspense>` boundary.
- **Mobile first**: All layouts are responsive. Use `grid lg:grid-cols-5` etc. for desktop layouts, single column on mobile.
- **Sticky sidebars**: Use `sticky top-24` for order summary sidebar on checkout page
- **Navigation**: Use `useRouter` from `next/navigation`, not `next/router`

## Architecture Decisions

1. **Supabase credentials are hardcoded in `src/lib/supabase.ts` only** — NO `process.env` fallback. The anon key is public-facing so this is safe. This prevents Vercel env vars from overriding with stale values.

2. **App state managed via React Context + useReducer** in `src/lib/store.tsx`. State includes: `user`, `products`, `categories`, `brands`, `cart`, `wishlist`, `orders`, `reviews`, `blogPosts`. Persisted to localStorage via a `HYDRATE` action on mount.
   - Access state: `const { state, dispatch } = useApp()`
   - Cart items: `state.cart` is `CartItem[]` where `CartItem = { product: Product, quantity: number }`
   - Wishlist items: `state.wishlist` is `Product[]`
   - Orders: `state.orders` is `Order[]`
   - User: `state.user` is `User | null` where `User = { id, name, email, avatar, phone, role: "user" | "admin" }`

3. **Orders stored in Supabase `orders` table** — checkout saves to both localStorage and Supabase. Admin dashboard fetches all orders from Supabase with status controls (Pending → Confirmed → Shipped → Delivered + Cancel). Account page fetches user's orders from Supabase for live status.

4. **Cart persistence across guest → logged-in:** The `HYDRATE` action reads localStorage on mount, so if a guest adds items then signs up/logs in, the cart items carry over. No special merging needed. HYDRATE always runs regardless of Supabase session state.

5. **Social links synced via Supabase** — `social_links` table in Supabase with a single row. Admin saves to both localStorage (fast cache) and Supabase (cross-device). Footer and WhatsApp component fetch from Supabase on mount with localStorage fallback.

6. **Admin role managed via `profiles` table** — links to `auth.users` via UUID. Auto-created as `'user'` on signup via trigger. Must be manually set to `'admin'` via SQL Editor for the admin account. No hardcoded credentials in source code.

7. **Framer-motion `<motion.div>` breaks form onSubmit** on auth pages — removed from login/register/forgot-password pages. The `initial`/`animate` props cause silent React hydration failure that prevents form submission.

## What Has Been Built

### Flash Sale & Hero Images
- Replaced flash sale 3rd slide with local `sgc.webp` for Spring Glow Collection
- Replaced K-Beauty hero image with local `kbeauty.jpg`
- Replaced Skincare category image with `sgc.webp`
- Category item counts are dynamic: `state.products.filter(p => p.category === cat.name).length`
- Category filter on products page uses `useEffect` watching `searchParams` to switch properly
- WhatsApp icon moved from `bottom-4` to `bottom-20` to clear mobile bottom nav

### Supabase Auth & Key Fix
- Old JWT anon key was invalid — replaced with working `sb_publishable_YTd9ZOjsscO7w_66Gyo4KA_kEQ_hOjg`
- Credentials are hardcoded directly (no env var fallback) because Vercel env var `NEXT_PUBLIC_SUPABASE_ANON_KEY` was overriding the fix with old key
- Login page handles both Supabase Auth and admin fallback (admin@glowshop.com / admin123)
- Register page uses `supabase.auth.signUp` with `full_name` and `phone` in user metadata
- Forgot-password page uses `supabase.auth.resetPasswordForEmail`
- After signup/login, guest-to-logged-in cart persistence works via localStorage `HYDRATE`

### Redirect Flow (Buy Now → Login → Checkout)
- **Product detail page** (`src/app/products/[slug]/page.tsx`): `handleBuyNow` adds item to cart, then:
  - Guest → `router.push("/login?redirect=/checkout")`
  - Logged-in → `router.push("/checkout")`
- **Login page** (`src/app/login/page.tsx`): Reads `?redirect=` param from URL. After login, redirects to that param (or `/account` if absent). Passes `redirect` param to the "Sign up" link. Wrapped in `<Suspense>` for Next.js CSR compatibility.
- **Register page** (`src/app/register/page.tsx`): Same pattern — reads `?redirect=`, redirects after signup, passes to "Sign in" link. Wrapped in `<Suspense>`.
- **Checkout page** (`src/app/checkout/page.tsx`): Auth guard via `useEffect` — if no user, redirects to `/login?redirect=/checkout`. Shows loading skeleton while checking auth state. All React hooks are ordered before any conditional return.
- **Cart page** ("Proceed to Checkout" → `/checkout`)
- **Login/Register redirects** changed from `/` to `/account`

### Account Dashboard (`/account`)
- 4 tabs via `useSearchParams`: Orders, Wishlist, Cart, Payment
- Orders tab shows real orders from `state.orders`
- Wishlist tab shows wishlist items with add-to-cart
- Cart tab has full cart UI with summary and checkout link
- Payment tab shows COD info only
- Wrapped in `<Suspense>` for Next.js CSR

### Checkout Page (`/checkout`)
- COD form fields: Full Name, Phone, Street, City, State, ZIP
- Order summary sidebar with cart items, subtotal, shipping, total
- On submit: dispatches `ADD_ORDER`, clears cart, redirects to `/account?tab=orders`
- Free shipping over $50, otherwise $5.99
- Guest users redirected to login

### Other Pages
- `/orders` page reads from `state.orders` (not hardcoded data)
- `/profile` sidebar links point to `/account?tab=orders` and `/account?tab=wishlist`
- `/cart` page "Proceed to Checkout" links to `/checkout`

## Recent Fixes (Jul 3)

### Session Persistence Fix (Jul 3)
- **Problem**: User logged out on navigation because `HYDRATE` reducer discarded the `user` field and nav Account links were hardcoded to `/login`.
- **Fix**: `restoreSession` dispatches `SET_USER` separately after `HYDRATE`. Added `supabase.auth.getSession()` check + `onAuthStateChanged` listener. Falls back to `parsed.user` from saved state. Header and bottom nav Account links now go to `/account` if logged in, `/login` if not.
- **Logout button**: Added to account dashboard (`src/app/account/page.tsx`).

### Currency Change (Jul 3)
- **Change**: `formatPrice` in `src/lib/utils.ts` switched from USD to BDT with locale `en-BD`, 0 decimal places.

### Hero Images on Mobile (Jul 3)
- **Problem**: Hero banner images hidden on mobile (`hidden lg:flex`).
- **Fix**: Changed to `flex` with `order-first` (image above text on mobile), responsive sizing (`w-48 h-48` mobile → `w-72 h-72` desktop).

### Header Category Counts (Jul 3)
- **Problem**: Header dropdown and mobile menu used static `cat.itemCount` (wrong values like 245, 189).
- **Fix**: Changed to `state.products.filter(p => p.category === cat.name).length` — same as homepage categories section.

### Supabase Orders Sync (Jul 3)
- **Problem**: Orders only in localStorage — admin on another device couldn't see customer orders, and no status updates.
- **Fix**:
  - Created `orders` table in Supabase (run `supabase-migration.sql` in Supabase SQL Editor)
  - Added API functions: `saveOrder`, `fetchOrders`, `fetchUserOrders`, `updateOrderStatus` in `src/lib/api.ts`
  - Checkout now saves order to Supabase after placing (`src/app/checkout/page.tsx`)
  - Admin dashboard fetches all orders from Supabase, shows customer info (name, email, address, phone), has status buttons: Pending → Confirmed → Shipped → Delivered + Cancel (`src/app/admin/page.tsx`)
  - Account page fetches user's orders from Supabase on mount to get live status updates (`src/app/account/page.tsx`)

### HYDRATE Always Runs (Jul 5)
- **Problem**: `restoreSession` returned early when Supabase session existed, skipping HYDRATE. Cart/orders/wishlist from localStorage never loaded on refresh.
- **Fix**: Moved HYDRATE dispatch before Supabase session check. Now always restores saved state first, then overlays user session.

### PostgREST Schema Cache (Jul 5)
- **Problem**: `PGRST204` errors for `address` and `date` columns on `orders` table — Supabase API cache was stale.
- **Fix**: Added `NOTIFY pgrst, 'reload schema'` to migration. Eventually recreated the table with `DROP TABLE IF EXISTS orders; CREATE TABLE orders (...)`.

### Social Links Cross-Device Sync (Jul 5)
- **Problem**: Social links saved to localStorage only — changes on PC didn't reflect on phone.
- **Fix**: Created `social_links` table in Supabase (single row, RLS). Admin saves to both localStorage + Supabase. Footer/WhatsApp fetch from Supabase on mount, fallback to localStorage.
- Added `fetchSocialLinksFromDB()` and `saveSocialLinksToDB()` in `src/lib/socials.ts`.

### Brand Icons (Jul 5)
- **Changed**: Replaced generic `MessageCircle`/`Camera`/`Globe`/`Video` icons with real Font Awesome brand icons: `FaFacebook`, `FaInstagram`, `FaTiktok`, `FaWhatsapp` from `react-icons/fa`.
- **Removed**: Twitter/X and YouTube from social links. Now only WhatsApp, Facebook, Instagram, TikTok.
- Installed `react-icons` package.

### Admin Logout on Refresh (Jul 5)
- **Problem**: `onAuthStateChange` fired `SIGNED_OUT` on page load with stale session, removing `glowshop-admin` from localStorage → admin couldn't restore session.
- **Fix**: Only clear `glowshop-admin` on explicit logout (not on refresh). Also check `session.user.email === "admin@glowshop.com"` as fallback to set role correctly.

### Secure Admin Auth (Jul 5 — DONE)
- **Problem**: Hardcoded `admin123` in client-side code — anyone could view source and log in.
- **Fix**: 
  - Created `profiles` table linked to `auth.users(id)` with `role` column (`'user'` | `'admin'`)
  - Auto-create profile via trigger on user signup (`role: 'user'`)
  - Login page now fetches profile after Supabase auth to determine role
  - Removed hardcoded `admin123` fallback from login
  - Admin user `glowshop69@gmail.com` created in Supabase Auth, profile set to `role: 'admin'`

### Footer Social Icons Hidden When Empty (Jul 5)
- **Problem**: Default URLs were `"#"` — clicking them navigated to current page.
- **Fix**: Changed defaults to `""` (empty string). Footer now hides icons with empty/`#` URLs. Admin input starts empty.

### Nav Account Link for Admin (Jul 5)
- **Changed**: Header, mobile menu, and bottom nav Account link goes to `/admin` for admin users (`state.user.role === "admin"`), otherwise `/account`.

### Logout Scope (Jul 5)
- **Fixed**: Changed `supabase.auth.signOut()` to `supabase.auth.signOut({ scope: "local" })` to fix 403 error on global logout.

### Checkout Error Visibility (Jul 5)
- **Fixed**: Checkout now shows an error toast if Supabase order sync fails (was silently caught before).

## Known Issues

1. **No product variants/inventory tracking**
3. **COD only** — no card/online payment
4. **Images are local** — not uploaded to CDN/storage
5. **Orders table schema cache** — if `PGRST204` errors occur again, run `NOTIFY pgrst, 'reload schema'` in SQL Editor

## File Map

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client init (hardcoded keys only) |
| `src/lib/store.tsx` | App state (Context + useReducer), orders, cart, wishlist, HYDRATE |
| `src/lib/api.ts` | Supabase data fetching + orders CRUD |
| `src/lib/data.ts` | Fallback products, categories, brands |
| `src/lib/reviews.ts` | Fallback review data |
| `src/lib/blog.ts` | Fallback blog post data |
| `src/lib/utils.ts` | `formatPrice` (BDT), `generateId`, etc. |
| `src/lib/socials.ts` | Social links defaults + localStorage + Supabase sync |
| `src/lib/pixel.ts` | Facebook Pixel event helper |
| `src/app/login/page.tsx` | Login with `?redirect=` support, fetches role from profiles table |
| `src/app/register/page.tsx` | Register with `?redirect=` support |
| `src/app/checkout/page.tsx` | COD checkout, saves order to Supabase |
| `src/app/account/page.tsx` | Dashboard with 4 tabs, fetches live order status from Supabase |
| `src/app/admin/page.tsx` | Admin dashboard — Supabase orders with status controls |
| `src/app/cart/page.tsx` | Cart with "Proceed to Checkout" → `/checkout` |
| `src/app/orders/page.tsx` | Order history from state |
| `src/app/products/[slug]/page.tsx` | Product detail with Buy Now flow |
| `src/app/profile/page.tsx` | User profile with sidebar links to account tabs |
| `src/components/layout/footer.tsx` | Footer with brand icons, Supabase-powered social links |
| `src/components/ui/whatsapp-chat.tsx` | WhatsApp floating button, fetches link from Supabase |
| `src/components/home/hero-banner.tsx` | Hero carousel — images visible on all screen sizes |
| `src/components/home/categories.tsx` | Category grid with dynamic product counts |
| `src/components/layout/header.tsx` | Header — dynamic account link, dynamic category counts |
| `src/components/layout/mobile-bottom-nav.tsx` | Mobile nav — dynamic account link |
| `supabase-migration.sql` | Run once in Supabase SQL Editor to create orders table |

<!-- END:work-history -->
