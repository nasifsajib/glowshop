"use client"

import { useState, useMemo } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Star, Heart, ShoppingBag, ChevronLeft, Minus, Plus,
  Shield, Leaf, Sparkles, Droplets, Sun, Zap, Truck,
  Check, Share2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ProductGrid } from "@/components/product/product-grid"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"
import { formatPrice, cn } from "@/lib/utils"
import { fbEvent } from "@/lib/pixel"

const ratingBreakdown = { 5: 65, 4: 22, 3: 8, 2: 3, 1: 2 }

const benefitIcons: Record<string, React.ReactNode> = {
  "Brightens": <Sun className="h-4 w-4" />,
  "Hydrates": <Droplets className="h-4 w-4" />,
  "Protects": <Shield className="h-4 w-4" />,
  "Calms": <Leaf className="h-4 w-4" />,
  "Renews": <Sparkles className="h-4 w-4" />,
  "Boosts": <Zap className="h-4 w-4" />,
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [zoomed, setZoomed] = useState(false)

  const product = state.products.find((p) => p.id === params.slug)
  const inWishlist = product ? state.wishlist.some((p) => p.id === product.id) : false

  const related = useMemo(
    () => (product ? state.products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4) : []),
    [product]
  )

  const frequentlyBought = useMemo(
    () => (product ? state.products.filter((p) => p.id !== product.id && p.price < product.price + 20).slice(0, 3) : []),
    [product]
  )

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4 opacity-20">✦</div>
        <h1 className="text-2xl font-bold">Product Not Found</h1>
        <Button asChild className="mt-4">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
    fbEvent("AddToCart", { content_ids: [product.id], content_name: product.name, content_type: "product", value: product.price, currency: "BDT" })
    toast({
      title: "Added to Cart!",
      description: `${quantity} × ${product.name} added to your cart.`,
      variant: "success",
    })
  }

  const handleToggleWishlist = () => {
    dispatch({ type: "TOGGLE_WISHLIST", payload: product })
    toast({
      title: inWishlist ? "Removed from Wishlist" : "Added to Wishlist",
      variant: inWishlist ? "default" : "success",
    })
  }

  const handleBuyNow = () => {
    if (!state.user) {
      for (let i = 0; i < quantity; i++) {
        dispatch({ type: "ADD_TO_CART", payload: product })
      }
      router.push("/login?redirect=/checkout")
      return
    }
    for (let i = 0; i < quantity; i++) {
      dispatch({ type: "ADD_TO_CART", payload: product })
    }
    router.push("/checkout")
  }

  const totalRating = Object.entries(ratingBreakdown).reduce(
    (sum, [stars, count]) => sum + Number(stars) * count, 0
  )
  const totalReviews = Object.values(ratingBreakdown).reduce((sum, c) => sum + c, 0)

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-foreground transition-colors">Products</Link>
        <span>/</span>
        <Link href={`/products?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium truncate">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-4">
            <motion.div
            className={cn(
              "relative aspect-square rounded-2xl bg-muted overflow-hidden cursor-crosshair",
              zoomed && "cursor-zoom-out"
            )}
            onMouseEnter={() => setZoomed(true)}
            onMouseLeave={() => setZoomed(false)}
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className={cn(
                "absolute inset-0 w-full h-full object-cover select-none",
                zoomed && "scale-150"
              )}
            />
            {product.discount > 0 && (
              <Badge variant="discount" className="absolute top-4 left-4 z-10 text-sm px-3 py-1">
                -{product.discount}%
              </Badge>
            )}
            {product.isNew && (
              <Badge variant="new" className="absolute top-4 left-4 z-10 text-sm px-3 py-1" style={{ left: product.discount > 0 ? "auto" : undefined, right: product.discount > 0 ? "auto" : undefined }}>
                New
              </Badge>
            )}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    i === selectedImage ? "bg-primary w-6" : "bg-primary/30 hover:bg-primary/50"
                  )}
                  aria-label={`View image ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={cn(
                  "w-20 h-20 rounded-xl border-2 shrink-0 bg-muted flex items-center justify-center transition-all",
                  i === selectedImage ? "border-primary" : "border-transparent hover:border-muted-foreground/30"
                )}
              >
                <img src={img} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover rounded-xl" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
              {product.brand}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <Badge variant="discount">Save ${product.originalPrice - product.price}</Badge>
              </>
            )}
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              product.stock > 20 ? "bg-emerald-500" : product.stock > 5 ? "bg-amber-500" : "bg-red-500"
            )} />
            <span className="text-sm text-muted-foreground">
              {product.stock > 20
                ? "In Stock"
                : product.stock > 5
                ? `Only ${product.stock} left`
                : "Low Stock"}
            </span>
            <Separator orientation="vertical" className="h-4" />
            <Truck className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Free shipping over 1,999 BDT</span>
          </div>

          <Separator />

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Benefits */}
          <div>
            <h4 className="text-sm font-semibold mb-3">Key Benefits</h4>
            <div className="grid grid-cols-2 gap-2">
              {product.benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 text-sm">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                    {Object.entries(benefitIcons).find(([key]) => benefit.toLowerCase().includes(key.toLowerCase()))?.[1] || <Check className="h-3.5 w-3.5" />}
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>

          {/* Skin Type */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium">Suitable for:</span>
            {product.skinType.map((type) => (
              <Badge key={type} variant="secondary">{type}</Badge>
            ))}
          </div>

          <Separator />

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center border rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 rounded-full hover:bg-muted transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium tabular-nums">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 rounded-full hover:bg-muted transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <Button onClick={handleAddToCart} className="flex-1 h-12" variant="premium">
              <ShoppingBag className="h-5 w-5" />
              Add to Cart &mdash; {formatPrice(product.price * quantity)}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 shrink-0"
              onClick={handleToggleWishlist}
              aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-red-500 text-red-500")} />
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12 shrink-0" aria-label="Share">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          <Button className="w-full h-12" variant="outline" onClick={handleBuyNow}>
            Buy Now
          </Button>

          {/* Mobile: Frequently bought together - moved here */}
          {frequentlyBought.length > 0 && (
            <div className="lg:hidden">
              <Separator className="mb-4" />
              <h4 className="font-semibold mb-3">Frequently Bought Together</h4>
              <div className="space-y-2">
                {frequentlyBought.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.id}`}
                    className="flex items-center gap-3 p-3 rounded-xl border hover:bg-muted transition-colors"
                  >
                    <img src={item.images[0]} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.name}</p>
                      <p className="text-sm font-semibold">{formatPrice(item.price)}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="shrink-0">+ Add</Button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Details, Ingredients, How to Use, Reviews */}
      <div className="mt-12 sm:mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start overflow-x-auto scrollbar-hide rounded-xl p-1 bg-muted h-auto">
            {["details", "ingredients", "how-to-use", "reviews"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-lg px-4 py-2 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm whitespace-nowrap"
              >
                {tab === "details" ? "Details" : tab === "ingredients" ? "Ingredients" : tab === "how-to-use" ? "How to Use" : `Reviews (${product.reviewCount})`}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="details" className="pt-6">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p>{product.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm font-semibold mb-1">Product Type</p>
                  <p className="text-sm text-muted-foreground">{product.productType}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm font-semibold mb-1">Category</p>
                  <p className="text-sm text-muted-foreground">{product.category}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm font-semibold mb-1">Brand</p>
                  <p className="text-sm text-muted-foreground">{product.brand}</p>
                </div>
                <div className="p-4 rounded-xl bg-muted/50">
                  <p className="text-sm font-semibold mb-1">Skin Types</p>
                  <p className="text-sm text-muted-foreground">{product.skinType.join(", ")}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ingredients" className="pt-6">
            <div className="max-w-prose">
              <p className="text-muted-foreground mb-4">{product.ingredients}</p>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.split(", ").map((ing) => (
                  <Badge key={ing} variant="secondary" className="text-xs">{ing}</Badge>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="how-to-use" className="pt-6">
            <div className="max-w-prose">
              <p className="text-muted-foreground">{product.howToUse}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Rating Breakdown */}
              <div>
                <div className="text-center p-6 rounded-xl border">
                  <p className="text-5xl font-bold">{product.rating}</p>
                  <div className="flex items-center justify-center gap-0.5 my-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < Math.floor(product.rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">{product.reviewCount.toLocaleString()} reviews</p>
                </div>
                <div className="mt-4 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingBreakdown[star as keyof typeof ratingBreakdown]
                    const pct = (count / totalReviews) * 100
                    return (
                      <div key={star} className="flex items-center gap-2 text-sm">
                        <span className="w-8 text-muted-foreground">{star} ★</span>
                        <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="w-8 text-right text-muted-foreground">{count}%</span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Reviews */}
              <div className="lg:col-span-2 space-y-4">
                {state.reviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-xl border">
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < review.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                    <p className="font-semibold text-sm mb-1">{review.title}</p>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">{review.userName}</span>
                      <span>&middot;</span>
                      <span>{review.date}</span>
                      <span>&middot;</span>
                      <span>{review.likes} likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-12 sm:mt-16">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-6">You May Also Like</h2>
          <ProductGrid products={related} />
        </section>
      )}

      {/* Desktop Frequently Bought Together */}
      {frequentlyBought.length > 0 && (
        <section className="mt-12 sm:mt-16 hidden lg:block">
          <h2 className="text-xl sm:text-2xl font-bold font-heading mb-6">Frequently Bought Together</h2>
          <div className="flex gap-4">
            {frequentlyBought.map((item) => (
              <Link
                key={item.id}
                href={`/products/${item.id}`}
                className="flex-1 p-4 rounded-xl border hover:shadow-md transition-all"
              >
                <img src={item.images[0]} alt={item.name} className="aspect-square w-full rounded-lg object-cover mb-3" />
                <p className="text-sm font-medium truncate">{item.name}</p>
                <p className="text-sm font-semibold mt-1">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <section className="mt-12 sm:mt-16 mb-8">
        <h2 className="text-xl sm:text-2xl font-bold font-heading mb-6">Recently Viewed</h2>
        <ProductGrid products={state.products.slice(0, 4)} />
      </section>
    </div>
  )
}
