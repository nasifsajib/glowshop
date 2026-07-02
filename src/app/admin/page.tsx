"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Plus, LogOut, ShoppingBag, DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApp } from "@/lib/store"
import { formatPrice, cn } from "@/lib/utils"

const stats = [
  { label: "Total Products", icon: Package, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Total Orders", icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Revenue", icon: DollarSign, color: "text-violet-500", bg: "bg-violet-500/10" },
  { label: "Growth", icon: TrendingUp, color: "text-amber-500", bg: "bg-amber-500/10" },
]

export default function AdminDashboard() {
  const router = useRouter()
  const { state, dispatch } = useApp()

  useEffect(() => {
    if (!state.user || state.user.role !== "admin") router.push("/login")
  }, [state.user, router])

  if (!state.user || state.user.role !== "admin") return null

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
                    <p className="text-2xl font-bold">
                      {stat.label === "Total Products" ? state.products.length :
                       stat.label === "Revenue" ? formatPrice(state.products.reduce((s, p) => s + p.price * 10, 0)) :
                       stat.label === "Growth" ? "+24%" :
                       "42"}
                    </p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
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
                      <p className="text-xs text-muted-foreground">{p.brand} &middot; ${p.price}</p>
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
      </div>
    </div>
  )
}
