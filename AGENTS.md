<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:work-history -->

## Work History

### Jul 2, 2026 — Fix images not loading on Vercel

**Problem:** The site deployed to Vercel showed empty sections (categories, brands, blog) with no images. The store's `initialState` had empty arrays for `products`, `categories`, `brands`, `reviews`, and `blogPosts`, so the initial server render produced no content. When Supabase tables existed but were empty, the fetch succeeded with `[]`, overwriting the fallback data.

**Changes in `src/lib/store.tsx`:**

1. **Pre-populated `initialState` with fallback data** — imported from `@/lib/data`, `@/lib/reviews`, and `@/lib/blog` so sections render immediately with images on first load.

2. **Preserved fallback data on empty Supabase results** — the `SET_INITIAL_DATA` reducer now only replaces each data field if the incoming array is non-empty. If Supabase returns empty arrays, the existing (fallback) data is kept.

```
products: action.payload.products.length > 0 ? action.payload.products : state.products,
categories: action.payload.categories.length > 0 ? action.payload.categories : state.categories,
brands: action.payload.brands.length > 0 ? action.payload.brands : state.brands,
reviews: action.payload.reviews.length > 0 ? action.payload.reviews : state.reviews,
blogPosts: action.payload.blogPosts.length > 0 ? action.payload.blogPosts : state.blogPosts,
```

<!-- END:work-history -->
