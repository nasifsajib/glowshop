"use client"

import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { ShoppingBag, Heart, Package, CreditCard, Trash2, Minus, Plus, ChevronRight, MapPin, Phone, User as UserIcon, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"
import { supabase } from "@/lib/supabase"
import { fetchUserOrders } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { formatPrice, cn } from "@/lib/utils"

const statusColors: Record<string, "default" | "secondary" | "success" | "warning" | "destructive"> = {
  delivered: "success",
  shipped: "secondary",
  confirmed: "default",
  pending: "warning",
  cancelled: "destructive",
}

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "cart", label: "Cart", icon: ShoppingBag },
  { id: "payment", label: "Payment", icon: CreditCard },
]

function AccountContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { state, dispatch } = useApp()

  const tabFromUrl = searchParams.get("tab") || "orders"
  const [activeTab, setActiveTab] = useState(tabs.find(t => t.id === tabFromUrl) ? tabFromUrl : "orders")

  useEffect(() => {
    const t = searchParams.get("tab")
    if (t && tabs.find(tab => tab.id === t)) {
      setActiveTab(t)
    }
  }, [searchParams])

  // Sync orders from Supabase to get live status updates
  useEffect(() => {
    if (!state.user) return
    fetchUserOrders(state.user.id)
      .then((orders) => {
        if (orders.length > 0) {
          dispatch({ type: "SET_ORDERS", payload: orders.map((o: any) => ({
            id: o.id,
            items: o.items || [],
            total: Number(o.total),
            status: o.status,
            date: o.date,
            address: o.address || { fullName: "", street: "", city: "", state: "", zip: "", phone: "" },
          })) })
        }
      })
      .catch(() => {})
  }, [state.user, dispatch])

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 5.99
  const cartTotal = subtotal + shipping

  const handleRemove = (id: string, name: string) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
    toast({ title: "Removed", description: `${name} removed from cart.` })
  }

  const handleQuantity = (id: string, qty: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity: qty } })
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">My Account</h1>
          <p className="text-sm text-muted-foreground">
            {state.user?.name || "Guest"} &middot; {state.user?.email || ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            dispatch({ type: "SET_USER", payload: null })
            try { localStorage.removeItem("glowshop-admin") } catch {}
            supabase.auth.signOut({ scope: "local" }).catch(() => {})
            router.push("/")
            toast({ title: "Logged out", variant: "success" })
          }}
          className="gap-1.5"
        >
          <LogOut className="h-3.5 w-3.5" /> Logout
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 rounded-xl bg-muted/50 border mb-8 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); router.replace(`/account?tab=${tab.id}`, { scroll: false }) }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab.id
                  ? "bg-background shadow-sm text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
              {tab.id === "wishlist" && state.wishlist.length > 0 && (
                <span className="ml-1 text-xs text-primary font-bold">({state.wishlist.length})</span>
              )}
              {tab.id === "cart" && state.cart.length > 0 && (
                <span className="ml-1 text-xs text-primary font-bold">({state.cart.length})</span>
              )}
            </button>
          )
        })}
      </div>

      {/* Orders Tab */}
      {activeTab === "orders" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Order History</h2>
          </div>

          {state.orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-semibold mb-1">No Orders Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">Start shopping to see your orders here.</p>
              <Button asChild variant="premium"><Link href="/products">Shop Now</Link></Button>
            </div>
          ) : (
            <div className="space-y-4 max-w-3xl">
              {state.orders.map((order) => (
                <div key={order.id} className="p-4 sm:p-6 rounded-2xl border bg-card">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="font-semibold text-sm">{order.id}</p>
                      <p className="text-xs text-muted-foreground">{order.date}</p>
                    </div>
                    <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                  </div>

                  <div className="space-y-2">
                    {order.items.map((item: any) => (
                      <div key={item.product.id} className="flex items-center gap-3">
                        <img src={item.product.images?.[0] || ""} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.product.name}</p>
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-sm font-semibold">Total: {formatPrice(order.total)}</span>
                        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {order.address.fullName}, {order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">COD</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Wishlist Tab */}
      {activeTab === "wishlist" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">My Wishlist</h2>
            {state.wishlist.length > 0 && (
              <p className="text-sm text-muted-foreground">{state.wishlist.length} items</p>
            )}
          </div>

          {state.wishlist.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-semibold mb-1">Wishlist Empty</h3>
              <p className="text-sm text-muted-foreground mb-4">Save your favorite items here.</p>
              <Button asChild variant="premium"><Link href="/products">Discover Products</Link></Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {state.wishlist.map((product) => (
                <div key={product.id} className="group p-4 rounded-xl border bg-card hover:shadow-lg transition-all">
                  <Link href={`/products/${product.id}`} className="block">
                    <div className="aspect-square rounded-lg bg-muted overflow-hidden mb-3">
                      <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <p className="text-xs text-muted-foreground uppercase">{product.brand}</p>
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-sm">{formatPrice(product.price)}</span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                      )}
                    </div>
                  </Link>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" className="flex-1 h-9 text-xs" onClick={() => {
                      dispatch({ type: "ADD_TO_CART", payload: product })
                      toast({ title: "Added to cart", description: product.name })
                    }}>Add to Cart</Button>
                    <Button size="sm" variant="outline" className="h-9 w-9 p-0" onClick={() => {
                      dispatch({ type: "TOGGLE_WISHLIST", payload: product })
                      toast({ title: "Removed from wishlist" })
                    }}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cart Tab */}
      {activeTab === "cart" && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            {state.cart.length > 0 && (
              <p className="text-sm text-muted-foreground">{state.cart.length} items</p>
            )}
          </div>

          {state.cart.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="font-semibold mb-1">Cart Empty</h3>
              <p className="text-sm text-muted-foreground mb-4">Add some products to your cart.</p>
              <Button asChild variant="premium"><Link href="/products">Shop Now</Link></Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-3">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 rounded-xl border">
                    <Link href={`/products/${item.product.id}`} className="w-20 h-20 rounded-lg bg-muted overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase">{item.product.brand}</p>
                          <Link href={`/products/${item.product.id}`} className="font-medium text-sm hover:text-primary transition-colors line-clamp-1">
                            {item.product.name}
                          </Link>
                        </div>
                        <p className="font-semibold text-sm shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border rounded-full">
                          <button onClick={() => handleQuantity(item.product.id, item.quantity - 1)} className="p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Decrease">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                          <button onClick={() => handleQuantity(item.product.id, item.quantity + 1)} className="p-1.5 rounded-full hover:bg-muted transition-colors" aria-label="Increase">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button onClick={() => handleRemove(item.product.id, item.product.name)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500 transition-colors" aria-label="Remove item">
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div className="sticky top-24 p-6 rounded-xl border bg-card">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
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
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between text-lg font-bold mb-6">
                    <span>Total</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <Button asChild className="w-full h-12" variant="premium">
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Payment Tab */}
      {activeTab === "payment" && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>

          <div className="max-w-lg space-y-4">
            <div className="p-6 rounded-2xl border-2 border-primary/20 bg-primary/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">Cash on Delivery</p>
                  <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> No upfront payment</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Pay in cash</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Inspect before paying</div>
                <div className="flex items-center gap-1.5"><span className="text-emerald-500">✓</span> Free returns</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border bg-card">
              <h3 className="font-semibold text-sm mb-3">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Items</span>
                  <span>Pay at delivery</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>Included in total</span>
                </div>
              </div>
              <Separator className="my-3" />
              <p className="text-xs text-muted-foreground">
                Cash on Delivery is currently the only payment method available.
                More options coming soon.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center"><div className="animate-pulse space-y-4"><div className="h-8 bg-muted rounded w-48 mx-auto" /><div className="h-4 bg-muted rounded w-64 mx-auto" /></div></div>}>
      <AccountContent />
    </Suspense>
  )
}
