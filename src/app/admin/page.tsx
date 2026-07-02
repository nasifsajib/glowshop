"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Plus, LogOut, ShoppingBag, DollarSign, TrendingUp, AlertCircle, Clock, ChevronDown, ChevronUp, MapPin, Phone as PhoneIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { formatPrice, cn } from "@/lib/utils"

const orderStatusColor: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600",
  processing: "bg-blue-500/10 text-blue-600",
  shipped: "bg-violet-500/10 text-violet-600",
  delivered: "bg-emerald-500/10 text-emerald-600",
  cancelled: "bg-red-500/10 text-red-600",
}

const orderStatusLabel: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

const revenue = (orders: { total: number }[]) => orders.reduce((s, o) => s + o.total, 0)

export default function AdminDashboard() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)

  useEffect(() => {
    if (!state.user || state.user.role !== "admin") router.push("/login")
  }, [state.user, router])

  if (!state.user || state.user.role !== "admin") return null

  const totalRevenue = revenue(state.orders)
  const totalOrders = state.orders.length
  const pendingOrders = state.orders.filter(o => o.status === "pending").length

  const stats = [
    { label: "Total Products", value: state.products.length, icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Total Orders", value: totalOrders, icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Revenue", value: formatPrice(totalRevenue), icon: DollarSign, color: "text-violet-500", bg: "bg-violet-500/10" },
    { label: "Pending", value: pendingOrders, icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  ]

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <span className="text-primary">✦</span> GlowShop <span className="text-xs text-muted-foreground font-normal">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
              <Link href="/"><ShoppingBag className="h-3.5 w-3.5" /> Store</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { dispatch({ type: "SET_USER", payload: null }); try { localStorage.removeItem("glowshop-admin") } catch {}; router.push("/login") }}>
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Dashboard</h1>
            <p className="text-muted-foreground text-sm">Welcome back, Admin</p>
          </div>
          <Button asChild variant="premium">
            <Link href="/admin/products/new"><Plus className="h-4 w-4" /> Add Product</Link>
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", stat.bg)}>
                    <stat.icon className={cn("h-6 w-6", stat.color)} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {state.products.slice(0, 5).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted-foreground">{p.brand} &middot; {formatPrice(p.price)}</p>
                    </div>
                    <Button asChild variant="ghost" size="sm">
                      <Link href={`/admin/products/${p.id}/edit`}>Edit</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start h-12">
                <Link href="/admin/products"><Package className="h-4 w-4" /> Manage Products</Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start h-12">
                <Link href="/admin/products/new"><Plus className="h-4 w-4" /> Add New Product</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Orders Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-primary" /> Orders
              {totalOrders > 0 && (
                <Badge variant="secondary" className="ml-1">{totalOrders}</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {totalOrders === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {state.orders.map((order) => (
                  <div key={order.id} className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-sm">{order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date} &middot; {order.items.length} item{order.items.length > 1 ? "s" : ""}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold">{formatPrice(order.total)}</span>
                        <Badge className={cn("text-xs", orderStatusColor[order.status])}>
                          {orderStatusLabel[order.status]}
                        </Badge>
                        {expandedOrder === order.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </button>
                    {expandedOrder === order.id && (
                      <div className="px-4 pb-4 pt-0 border-t">
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Shipping Address</p>
                          <div className="text-sm space-y-1 text-muted-foreground">
                            <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {order.address.fullName}</p>
                            <p className="ml-5">{order.address.street}, {order.address.city}, {order.address.state} {order.address.zip}</p>
                            <p className="flex items-center gap-1.5 ml-0"><PhoneIcon className="h-3.5 w-3.5" /> {order.address.phone}</p>
                          </div>
                          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mt-3">Items</p>
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-2 text-sm">
                              <span className="w-6 h-6 rounded bg-muted overflow-hidden shrink-0">
                                <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                              </span>
                              <span className="flex-1 truncate">{item.product.name}</span>
                              <span className="text-muted-foreground">x{item.quantity}</span>
                              <span className="font-medium">{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
