"use client"

import Link from "next/link"
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductGrid } from "@/components/product/product-grid"
import { useApp } from "@/lib/store"

export default function WishlistPage() {
  const { state, dispatch } = useApp()

  if (state.wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4 opacity-20">✦</div>
        <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist is Empty</h1>
        <p className="text-muted-foreground mb-6">Save your favourite products to your wishlist.</p>
        <Button asChild variant="premium">
          <Link href="/products">Discover Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">My Wishlist</h1>
          <p className="text-sm text-muted-foreground">{state.wishlist.length} items saved</p>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/products"><ShoppingBag className="h-4 w-4" /> Shop All</Link>
        </Button>
      </div>

      <ProductGrid products={state.wishlist} />

      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/products"><ArrowLeft className="h-4 w-4" /> Continue Shopping</Link>
        </Button>
      </div>
    </div>
  )
}
