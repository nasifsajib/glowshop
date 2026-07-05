"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"
import { formatPrice, cn } from "@/lib/utils"

export default function CartPage() {
  const { state, dispatch } = useApp()

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 1999 ? 0 : 99
  const total = subtotal + shipping

  const handleRemove = (id: string, name: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
    toast({ title: "Removed", description: `${name} removed from cart.` })
  }

  const handleQuantity = (id: string, qty: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } })
  }

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4 opacity-20">✦</div>
        <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold mb-2">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Button asChild variant="premium">
          <Link href="/products">Continue Shopping</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon" className="shrink-0">
          <Link href="/products"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Shopping Cart</h1>
          <p className="text-sm text-muted-foreground">{state.cart.length} items</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.cart.map((item, i) => (
            <motion.div
              key={item.product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex gap-4 p-4 rounded-xl border"
            >
              <Link
                href={`/products/${item.product.id}`}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-muted overflow-hidden shrink-0"
              >
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase">{item.product.brand}</p>
                    <Link
                      href={`/products/${item.product.id}`}
                      className="font-medium text-sm hover:text-primary transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                  </div>
                  <p className="font-semibold text-sm shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-full">
                    <button
                      onClick={() => handleQuantity(item.product.id, item.quantity - 1)}
                      className="p-1.5 rounded-full hover:bg-muted transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantity(item.product.id, item.quantity + 1)}
                      className="p-1.5 rounded-full hover:bg-muted transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.product.id, item.product.name)}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="pt-4">
            <Button asChild variant="outline">
              <Link href="/products"><ArrowLeft className="h-4 w-4" /> Continue Shopping</Link>
            </Button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-xl border bg-card">
            <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

            {/* Coupon */}
            <div className="flex gap-2 mb-4">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Coupon code" className="pl-9 h-10" />
              </div>
              <Button variant="outline" size="sm" className="h-10">Apply</Button>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className={cn("font-medium", shipping === 0 && "text-emerald-600")}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground">
                  Free shipping on orders over 1,999 BDT
                </p>
              )}
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Button asChild className="w-full h-12" variant="premium">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShoppingBag className="h-3 w-3" />
              Secure checkout &middot; Free returns
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
