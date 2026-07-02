"use client"

import { createContext, useContext, useReducer, useEffect, ReactNode } from "react"
import { CartItem, Product, Address, User, Category, Brand, Review, BlogPost, Order } from "@/types"
import { fetchProducts, fetchCategories, fetchBrands, fetchReviews, fetchBlogPosts } from "@/lib/api"
import { products as fallbackProducts, categories as fallbackCats, brands as fallbackBrands } from "@/lib/data"
import { reviews as fallbackReviews } from "@/lib/reviews"
import { blogPosts as fallbackBlog } from "@/lib/blog"

interface AppState {
  cart: CartItem[]
  wishlist: Product[]
  user: User | null
  addresses: Address[]
  isDarkMode: boolean
  recentlyViewed: Product[]
  searchHistory: string[]
  products: Product[]
  categories: Category[]
  brands: Brand[]
  reviews: Review[]
  blogPosts: BlogPost[]
  dataLoading: boolean
  adminOrders: any[]
  orders: Order[]
}

type Action =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_WISHLIST"; payload: Product }
  | { type: "SET_USER"; payload: User | null }
  | { type: "ADD_ADDRESS"; payload: Address }
  | { type: "REMOVE_ADDRESS"; payload: string }
  | { type: "SET_DEFAULT_ADDRESS"; payload: string }
  | { type: "TOGGLE_DARK_MODE" }
  | { type: "ADD_RECENTLY_VIEWED"; payload: Product }
  | { type: "ADD_SEARCH_HISTORY"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "HYDRATE"; payload: Partial<AppState> }
  | { type: "ADMIN_ADD_PRODUCT"; payload: Product }
  | { type: "ADMIN_UPDATE_PRODUCT"; payload: Product }
  | { type: "ADMIN_DELETE_PRODUCT"; payload: string }
  | { type: "ADMIN_SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_INITIAL_DATA"; payload: { products: Product[]; categories: Category[]; brands: Brand[]; reviews: Review[]; blogPosts: BlogPost[] } }
  | { type: "ADD_ORDER"; payload: Order }
  | { type: "SET_ORDERS"; payload: Order[] }

const initialState: AppState = {
  cart: [],
  wishlist: [],
  user: null,
  addresses: [
    {
      id: "addr1",
      fullName: "Nasif Ahmed",
      street: "123 Beauty Lane, Apt 4B",
      city: "New York",
      state: "NY",
      zip: "10001",
      phone: "+1 (555) 123-4567",
      isDefault: true,
    },
  ],
  isDarkMode: false,
  recentlyViewed: [],
  searchHistory: [],
  products: fallbackProducts,
  categories: fallbackCats,
  brands: fallbackBrands,
  reviews: fallbackReviews,
  blogPosts: fallbackBlog,
  dataLoading: true,
  adminOrders: [],
  orders: [],
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.cart.find((item) => item.product.id === action.payload.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return { ...state, cart: [...state.cart, { product: action.payload, quantity: 1 }] }
    }
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.product.id !== action.payload) }
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      }
    case "TOGGLE_WISHLIST": {
      const exists = state.wishlist.find((p) => p.id === action.payload.id)
      return {
        ...state,
        wishlist: exists
          ? state.wishlist.filter((p) => p.id !== action.payload.id)
          : [...state.wishlist, action.payload],
      }
    }
    case "SET_USER":
      return { ...state, user: action.payload }
    case "ADD_ADDRESS":
      return { ...state, addresses: [...state.addresses, action.payload] }
    case "REMOVE_ADDRESS":
      return { ...state, addresses: state.addresses.filter((a) => a.id !== action.payload) }
    case "SET_DEFAULT_ADDRESS":
      return {
        ...state,
        addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === action.payload })),
      }
    case "TOGGLE_DARK_MODE":
      return { ...state, isDarkMode: !state.isDarkMode }
    case "HYDRATE":
      return {
        ...state,
        cart: action.payload.cart || state.cart,
        wishlist: action.payload.wishlist || state.wishlist,
        addresses: action.payload.addresses || state.addresses,
        recentlyViewed: action.payload.recentlyViewed || state.recentlyViewed,
        searchHistory: action.payload.searchHistory || state.searchHistory,
        orders: action.payload.orders || state.orders,
        isDarkMode: action.payload.isDarkMode ?? state.isDarkMode,
      }
    case "ADD_RECENTLY_VIEWED": {
      const filtered = state.recentlyViewed.filter((p) => p.id !== action.payload.id)
      return { ...state, recentlyViewed: [action.payload, ...filtered].slice(0, 10) }
    }
    case "ADD_SEARCH_HISTORY": {
      const filtered = state.searchHistory.filter((s) => s !== action.payload)
      return { ...state, searchHistory: [action.payload, ...filtered].slice(0, 10) }
    }
    case "CLEAR_CART":
      return { ...state, cart: [] }
    case "ADD_ORDER":
      return { ...state, orders: [action.payload, ...state.orders] }
    case "SET_ORDERS":
      return { ...state, orders: action.payload }
    case "ADMIN_ADD_PRODUCT":
      return { ...state, products: [action.payload, ...state.products] }
    case "ADMIN_UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      }
    case "ADMIN_DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((p) => p.id !== action.payload),
        wishlist: state.wishlist.filter((p) => p.id !== action.payload),
        cart: state.cart.filter((item) => item.product.id !== action.payload),
      }
    case "ADMIN_SET_PRODUCTS":
      return { ...state, products: action.payload }
    case "SET_INITIAL_DATA":
      return {
        ...state,
        ...action.payload,
        products: action.payload.products.length > 0 ? action.payload.products : state.products,
        categories: action.payload.categories.length > 0 ? action.payload.categories : state.categories,
        brands: action.payload.brands.length > 0 ? action.payload.brands : state.brands,
        reviews: action.payload.reviews.length > 0 ? action.payload.reviews : state.reviews,
        blogPosts: action.payload.blogPosts.length > 0 ? action.payload.blogPosts : state.blogPosts,
        dataLoading: false,
      }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    try {
      const saved = localStorage.getItem("glowshop-state")
      if (saved) {
        const parsed = JSON.parse(saved)
        const adminSaved = localStorage.getItem("glowshop-admin")
        let user = null
        if (adminSaved) {
          try { user = JSON.parse(adminSaved) } catch {}
        }
        dispatch({ type: "HYDRATE", payload: { ...parsed, user: user || null } })
      } else {
        const adminSaved = localStorage.getItem("glowshop-admin")
        if (adminSaved) {
          try { dispatch({ type: "SET_USER", payload: JSON.parse(adminSaved) }) } catch {}
        }
      }
    } catch { /* ignore */ }
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadData() {
      try {
        const [products, categories, brands, reviews, blogPosts] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
          fetchBrands(),
          fetchReviews(),
          fetchBlogPosts(),
        ])
        if (mounted) {
          dispatch({ type: "SET_INITIAL_DATA", payload: { products, categories, brands, reviews, blogPosts } })
        }
      } catch (err) {
        console.error("Failed to load initial data, using fallback:", err)
        if (mounted) {
          dispatch({ type: "SET_INITIAL_DATA", payload: {
            products: fallbackProducts,
            categories: fallbackCats,
            brands: fallbackBrands,
            reviews: fallbackReviews,
            blogPosts: fallbackBlog,
          }})
        }
      }
    }
    loadData()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    localStorage.setItem("glowshop-state", JSON.stringify(state))
  }, [state])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", state.isDarkMode)
  }, [state.isDarkMode])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}


