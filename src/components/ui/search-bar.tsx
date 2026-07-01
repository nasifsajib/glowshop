"use client"

import { useState, useRef, useEffect } from "react"
import { Search, X, Clock, TrendingUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Input } from "@/components/ui/input"
import { useApp } from "@/lib/store"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function SearchBar() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, dispatch } = useApp()

  const results = query
    ? state.products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : []

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus()
  }, [open])

  const handleSearch = (term: string) => {
    if (term.trim()) dispatch({ type: "ADD_SEARCH_HISTORY", payload: term.trim() })
    setOpen(false)
    setQuery("")
  }

  return (
    <div className="relative flex-1 max-w-md mx-auto">
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-2 rounded-full border border-input bg-muted/50 px-4 py-2 text-sm text-muted-foreground hover:bg-muted transition-colors"
        aria-label="Open search"
      >
        <Search className="h-4 w-4" />
        <span>Search products...</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto mt-20 max-w-xl w-full bg-background rounded-2xl shadow-2xl border overflow-hidden"
            >
              <div className="relative p-4">
                <Search className="absolute left-7 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
                  placeholder="Search products, brands, ingredients..."
                  className="pl-12 pr-10 h-12 text-base rounded-xl"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-7 top-1/2 -translate-y-1/2"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              <div className="px-4 pb-4 max-h-80 overflow-y-auto">
                {query && results.length > 0 && (
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground px-3 py-1">
                      PRODUCTS
                    </p>
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        onClick={() => { setOpen(false); setQuery("") }}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{product.name}</p>
                          <p className="text-xs text-muted-foreground">{product.brand}</p>
                        </div>
                        <span className="text-sm font-semibold">${product.price}</span>
                      </Link>
                    ))}
                  </div>
                )}

                {!query && state.searchHistory.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground px-3 py-1 flex items-center gap-1">
                      <Clock className="h-3 w-3" /> RECENT SEARCHES
                    </p>
                    <div className="flex flex-wrap gap-2 px-3">
                      {state.searchHistory.map((term) => (
                        <button
                          key={term}
                          onClick={() => handleSearch(term)}
                          className="text-sm px-3 py-1 rounded-full bg-muted hover:bg-muted/80 transition-colors"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {!query && state.searchHistory.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <TrendingUp className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Search for your favorite products</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
