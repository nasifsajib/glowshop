"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"
import { formatPrice, cn } from "@/lib/utils"
import type { Product } from "@/types"

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { state, dispatch } = useApp()
  const inWishlist = state.wishlist.some((p) => p.id === product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: "ADD_TO_CART", payload: product })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      variant: "success",
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch({ type: "TOGGLE_WISHLIST", payload: product })
    toast({
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      description: `${product.name} has been ${inWishlist ? "removed from" : "added to"} your wishlist.`,
      variant: inWishlist ? "default" : "success",
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/products/${product.id}`}
        className="group block rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/20"
      >
        {/* Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {product.discount > 0 && (
              <Badge variant="discount">-{product.discount}%</Badge>
            )}
            {product.isNew && <Badge variant="new">New</Badge>}
            {product.isFlashSale && (
              <Badge variant="warning">⚡ Flash Sale</Badge>
            )}
          </div>

          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:scale-110",
              inWishlist ? "text-red-500" : "text-muted-foreground hover:text-red-400"
            )}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </button>

          {/* Quick add */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <Button
              size="sm"
              className="w-full shadow-lg"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-4 space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="font-medium text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-muted-foreground">({product.reviewCount.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Mobile quick add */}
          <div className="sm:hidden pt-1">
            <Button size="sm" className="w-full text-xs" onClick={handleAddToCart}>
              <ShoppingBag className="h-3 w-3" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
