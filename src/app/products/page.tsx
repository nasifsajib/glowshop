"use client"

import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useApp } from "@/lib/store"

const skinTypes = ["All", "Normal", "Oily", "Dry", "Combination", "Sensitive"]
const productTypes = ["All", "Serum", "Moisturizer", "Cleanser", "Toner", "Mask", "Oil", "Tint", "Lipstick", "Treatment", "Eye Cream", "Mist", "Body Butter", "Sunscreen"]
const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "best-selling", label: "Best Selling" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
]

function ProductsContent() {
  const { state } = useApp()
  const { products, categories, brands } = state
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    brand: "All",
    skinType: "All",
    productType: "All",
    priceRange: "all",
    rating: 0,
  })
  useEffect(() => {
    const cat = searchParams.get("category")
    if (cat && cat !== filters.category) {
      setFilters((prev) => ({ ...prev, category: cat }))
    }
  }, [searchParams])

  const [sort, setSort] = useState("newest")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [view, setView] = useState<"grid" | "list">("grid")

  const filtered = useMemo(() => {
    let result = [...products]

    if (filters.category !== "All") {
      result = result.filter((p) => p.category === filters.category)
    }
    if (filters.brand !== "All") {
      result = result.filter((p) => p.brand === filters.brand)
    }
    if (filters.skinType !== "All") {
      result = result.filter((p) => p.skinType.includes(filters.skinType))
    }
    if (filters.productType !== "All") {
      result = result.filter((p) => p.productType === filters.productType)
    }
    if (filters.rating > 0) {
      result = result.filter((p) => p.rating >= filters.rating)
    }
    if (filters.priceRange !== "all") {
      const [min, max] = filters.priceRange.split("-").map(Number)
      result = result.filter((p) => p.price >= min && (max ? p.price <= max : true))
    }

    switch (sort) {
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1))
        break
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount)
        break
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
    }
    return result
  }, [filters, sort])

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Category</h4>
        <div className="space-y-1">
          {["All", ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilters({ ...filters, category: cat })}
              className={cn(
                "block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
                filters.category === cat
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Brand */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Brand</h4>
        <div className="space-y-1">
          {["All", ...brands.map((b) => b.name)].map((b) => (
            <button
              key={b}
              onClick={() => setFilters({ ...filters, brand: b })}
              className={cn(
                "block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
                filters.brand === b
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Price Range</h4>
        <div className="space-y-1">
          {[
            { value: "all", label: "All Prices" },
            { value: "0-20", label: "Under $20" },
            { value: "20-40", label: "$20 - $40" },
            { value: "40-60", label: "$40 - $60" },
            { value: "60-999", label: "$60+" },
          ].map((range) => (
            <button
              key={range.value}
              onClick={() => setFilters({ ...filters, priceRange: range.value })}
              className={cn(
                "block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
                filters.priceRange === range.value
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Skin Type */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Skin Type</h4>
        <div className="flex flex-wrap gap-2">
          {skinTypes.map((type) => (
            <button
              key={type}
              onClick={() => setFilters({ ...filters, skinType: type })}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium border transition-colors",
                filters.skinType === type
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-input hover:border-primary/50"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Minimum Rating</h4>
        <div className="space-y-1">
          {[0, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => setFilters({ ...filters, rating: r })}
              className={cn(
                "block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors",
                filters.rating === r
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {r === 0 ? "All Ratings" : `${r}+ Stars`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">
            {filters.category === "All" ? "All Products" : filters.category}
          </h1>
          <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium hover:bg-muted transition-colors lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </button>

          <div className="hidden sm:flex items-center border rounded-full">
            {[
              { icon: Grid3X3, value: "grid" as const },
              { icon: List, value: "list" as const },
            ].map(({ icon: Icon, value }) => (
              <button
                key={value}
                onClick={() => setView(value)}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  view === value ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={`${value} view`}
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border bg-background px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Sort products"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <FilterContent />
          </div>
        </aside>

        {/* Product Grid / List */}
        <div className="flex-1 min-w-0">
          {filtered.length > 0 ? (
            <ProductGrid products={filtered} />
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4 opacity-20">✦</div>
              <h3 className="text-lg font-semibold">No products found</h3>
              <p className="text-muted-foreground text-sm mt-1">
                Try adjusting your filters
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() =>
                  setFilters({
                    category: "All",
                    brand: "All",
                    skinType: "All",
                    productType: "All",
                    priceRange: "all",
                    rating: 0,
                  })
                }
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-6 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <X className="h-5 w-5" />
              </button>
            </div>
            <FilterContent />
            <div className="mt-6">
              <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                Apply Filters
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center"><div className="text-4xl opacity-20">✦</div><p className="text-muted-foreground mt-4">Loading...</p></div>}>
      <ProductsContent />
    </Suspense>
  )
}
