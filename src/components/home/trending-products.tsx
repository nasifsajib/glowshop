"use client"

import { TrendingUp } from "lucide-react"
import { ProductGrid } from "@/components/product/product-grid"
import { products } from "@/lib/data"

export function TrendingProducts() {
  const trending = products.filter((p) => p.isTrending).slice(0, 8)

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-violet-50/50 to-pink-50/50 dark:from-violet-950/10 dark:to-pink-950/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">Trending Now</h2>
        </div>

        <ProductGrid products={trending} />
      </div>
    </section>
  )
}
