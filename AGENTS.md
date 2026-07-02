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
- **Admin login:** `admin@glowshop.com` / `admin123` (hardcoded fallback in login page, bypasses Supabase if it fails)
- **Email confirmation:** DISABLED in Supabase Auth settings (users can sign up and are immediately logged in)
- **Vercel project:** `glowshop-beige` on `vercel.com/nasifsajibs-projects`
- **Custom domain (if any):** none yet, uses `glowshop-beige.vercel.app`
- **Vercel env vars to NEVER set:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` — must NOT exist in Vercel, because old invalid key was overriding the hardcoded correct key
- **WhatsApp number:** still placeholder `wa.me/1234567890` — needs real number

## Design System & UI Patterns

- **Color scheme**: Uses CSS variables from `globals.css` — `primary`, `secondary`, `accent`, `muted`, `card`, `background`, `foreground`, `border`
- **Shadcn/ui components**: Located in `src/components/ui/`. Use `Button`, `Input`, `Label`, `Separator`, `Card`, `Badge`, `Sheet`, `Tabs`, `Select`, `Dialog`, etc.
- **Button variants**: `premium` (gradient primary), `default`, `outline`, `ghost`, `destructive`
- **Icons**: `lucide-react` — use icons from that package only
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

3. **No backend database for orders yet** — orders are stored in localStorage only via the `orders` array in app state. No Supabase orders table. Admin dashboard cannot see customer orders.

4. **Cart persistence across guest → logged-in:** The `HYDRATE` action reads localStorage on mount, so if a guest adds items then signs up/logs in, the cart items carry over. No special merging needed.

5. **Framer-motion `<motion.div>` breaks form onSubmit** on auth pages — removed from login/register/forgot-password pages. The `initial`/`animate` props cause silent React hydration failure that prevents form submission.

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

## Known Issues & Next Steps

1. **Admin cannot see customer orders** — orders are only in localStorage. Need a Supabase `orders` table and backend sync if admin dashboard needs order management.
2. **WhatsApp number** is still placeholder `wa.me/1234567890` — needs real business number.
3. **Social media links** in footer need URLs when user provides them.
4. **Email confirmation is OFF** in Supabase — this is intentional for now.
5. **No product variants/inventory tracking** — all products have single price/stock.
6. **No payment processing** — COD only for now.
7. **Images are local** — need to be uploaded to Supabase storage or CDN for production.

## File Map

| File | Purpose |
|------|---------|
| `src/lib/supabase.ts` | Supabase client init (hardcoded keys only) |
| `src/lib/store.tsx` | App state (Context + useReducer), includes orders, cart, wishlist, HYDRATE |
| `src/lib/data.ts` | Fallback products, categories, brands |
| `src/lib/reviews.ts` | Fallback review data |
| `src/lib/blog.ts` | Fallback blog post data |
| `src/lib/utils.ts` | `formatPrice`, `generateId`, etc. |
| `src/app/login/page.tsx` | Login with `?redirect=` support, admin fallback |
| `src/app/register/page.tsx` | Register with `?redirect=` support |
| `src/app/checkout/page.tsx` | COD checkout with auth guard |
| `src/app/account/page.tsx` | Dashboard with 4 tabs (Orders/Wishlist/Cart/Payment) |
| `src/app/cart/page.tsx` | Cart with "Proceed to Checkout" → `/checkout` |
| `src/app/orders/page.tsx` | Order history from state |
| `src/app/products/[slug]/page.tsx` | Product detail with Buy Now flow |
| `src/app/profile/page.tsx` | User profile with sidebar links to account tabs |

<!-- END:work-history -->
