"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, Plus, LogOut, ShoppingBag, DollarSign, Clock, ChevronDown, ChevronUp, MapPin, Phone as PhoneIcon, Mail, User as UserIcon, Globe, Save } from "lucide-react"
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { fetchOrders, updateOrderStatus } from "@/lib/api"
import { formatPrice, cn } from "@/lib/utils"
import { getSocialLinks, saveSocialLinks, fetchSocialLinksFromDB, saveSocialLinksToDB, defaultSocials, type SocialLinks } from "@/lib/socials"
import { toast } from "@/hooks/use-toast"

const statusFlow = ["pending", "confirmed", "shipped", "delivered"]

const orderStatusColor: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-600",
  confirmed: "bg-blue-500/10 text-blue-600",
  shipped: "bg-violet-500/10 text-violet-600",
  delivered: "bg-emerald-500/10 text-emerald-600",
  cancelled: "bg-red-500/10 text-red-600",
}

const orderStatusLabel: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export default function AdminDashboard() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const [allOrders, setAllOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(() => getSocialLinks())
  const [socialOpen, setSocialOpen] = useState(false)

  useEffect(() => {
    fetchSocialLinksFromDB().then((db) => {
      if (db) {
        setSocialLinks(db)
        saveSocialLinks(db)
      }
    })
  }, [])

  const loadOrders = useCallback(async () => {
    try {
      const orders = await fetchOrders()
      setAllOrders(orders)
    } catch (err) {
      console.error("Failed to load orders:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (state.user && state.user.role === "admin") {
      loadOrders()
    }
  }, [state.user, loadOrders])

  useEffect(() => {
    if (!state.user || state.user.role !== "admin") router.push("/login")
  }, [state.user, router])

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
      setAllOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
      toast({ title: `Order ${orderId} marked as ${orderStatusLabel[newStatus]}`, variant: "success" })
    } catch (err) {
      toast({ title: "Failed to update status", variant: "error" })
    } finally {
      setUpdatingId(null)
    }
  }

  if (!state.user || state.user.role !== "admin") return null

  const totalRevenue = allOrders.reduce((s, o) => s + Number(o.total), 0)
  const totalOrders = allOrders.length
  const pendingOrders = allOrders.filter(o => o.status === "pending").length

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

        {/* Social Media Settings */}
        <Card className="mb-8">
          <CardHeader>
            <button
              onClick={() => setSocialOpen(!socialOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" /> Social Media Links
              </CardTitle>
              {socialOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
            </button>
          </CardHeader>
          {socialOpen && (
            <CardContent>
              <div className="space-y-4 max-w-lg">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><FaWhatsapp className="h-4 w-4" style={{ color: "#25D366" }} /> WhatsApp Link</Label>
                  <Input value={socialLinks.whatsapp} onChange={e => setSocialLinks(p => ({ ...p, whatsapp: e.target.value }))} placeholder="https://wa.me/1234567890" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><FaFacebook className="h-4 w-4" style={{ color: "#1877F2" }} /> Facebook</Label>
                  <Input value={socialLinks.facebook} onChange={e => setSocialLinks(p => ({ ...p, facebook: e.target.value }))} placeholder="https://facebook.com/glowshop" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><FaInstagram className="h-4 w-4" style={{ color: "#E4405F" }} /> Instagram</Label>
                  <Input value={socialLinks.instagram} onChange={e => setSocialLinks(p => ({ ...p, instagram: e.target.value }))} placeholder="https://instagram.com/glowshop" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><FaTiktok className="h-4 w-4" /> TikTok</Label>
                  <Input value={socialLinks.tiktok} onChange={e => setSocialLinks(p => ({ ...p, tiktok: e.target.value }))} placeholder="https://tiktok.com/@glowshop" />
                </div>
                <Button
                  variant="premium"
                  className="gap-2"
                  onClick={async () => {
                    // Save to localStorage (immediate)
                    saveSocialLinks(socialLinks)
                    // Sync to Supabase (cross-device)
                    try {
                      await saveSocialLinksToDB(socialLinks)
                      toast({ title: "Social links saved for all devices!", variant: "success" })
                    } catch (err) {
                      console.error("Failed to sync social links to DB:", err)
                      toast({ title: "Saved locally only", description: "Could not sync to server.", variant: "error" })
                    }
                    setSocialOpen(false)
                  }}
                >
                  <Save className="h-4 w-4" /> Save Links
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

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
            {loading ? (
              <div className="text-center py-8 text-muted-foreground animate-pulse">Loading orders...</div>
            ) : allOrders.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingBag className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No orders yet.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {allOrders.map((order) => (
                  <div key={order.id} className="border rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                      className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="min-w-0">
                          <p className="font-medium text-sm truncate">{order.id}</p>
                          <p className="text-xs text-muted-foreground truncate">{order.user_name || "Unknown"}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-semibold">{formatPrice(Number(order.total))}</span>
                        <Badge className={cn("text-xs", orderStatusColor[order.status])}>
                          {orderStatusLabel[order.status]}
                        </Badge>
                        {expandedOrder === order.id ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                      </div>
                    </button>
                    {expandedOrder === order.id && (
                      <div className="px-4 pb-4 pt-0 border-t">
                        <div className="mt-3 space-y-3">
                          {/* Customer Info */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Customer</p>
                            <div className="text-sm space-y-1 text-muted-foreground">
                              <p className="flex items-center gap-1.5"><UserIcon className="h-3.5 w-3.5" /> {order.user_name}</p>
                              <p className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> {order.user_email}</p>
                            </div>
                          </div>

                          {/* Shipping Address */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Shipping Address</p>
                            <div className="text-sm space-y-1 text-muted-foreground">
                              <p className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {order.address?.fullName}</p>
                              <p className="ml-5">{order.address?.street}, {order.address?.city}, {order.address?.state} {order.address?.zip}</p>
                              <p className="flex items-center gap-1.5"><PhoneIcon className="h-3.5 w-3.5" /> {order.address?.phone}</p>
                            </div>
                          </div>

                          {/* Items */}
                          <div>
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">Items ({order.date})</p>
                            {order.items?.map((item: any) => (
                              <div key={item.product?.id || item.id} className="flex items-center gap-2 text-sm py-1">
                                <span className="w-6 h-6 rounded bg-muted overflow-hidden shrink-0">
                                  <img src={item.product?.images?.[0] || ""} alt="" className="w-full h-full object-cover" />
                                </span>
                                <span className="flex-1 truncate">{item.product?.name || "Product"}</span>
                                <span className="text-muted-foreground">x{item.quantity}</span>
                                <span className="font-medium">{formatPrice(Number(item.product?.price || 0) * item.quantity)}</span>
                              </div>
                            ))}
                          </div>

                          {/* Status Control */}
                          <div className="pt-2 border-t">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Update Status</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {statusFlow.map((s) => (
                                <Button
                                  key={s}
                                  size="sm"
                                  variant={order.status === s ? "default" : "outline"}
                                  disabled={updatingId === order.id}
                                  onClick={() => handleStatusChange(order.id, s)}
                                  className={cn(
                                    "text-xs",
                                    order.status === s && s === "cancelled" && "bg-red-500 hover:bg-red-600",
                                    order.status === s && s === "delivered" && "bg-emerald-500 hover:bg-emerald-600"
                                  )}
                                >
                                  {updatingId === order.id ? "..." : orderStatusLabel[s]}
                                </Button>
                              ))}
                              {order.status !== "cancelled" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  disabled={updatingId === order.id}
                                  onClick={() => handleStatusChange(order.id, "cancelled")}
                                  className="text-xs text-red-500 border-red-200 hover:bg-red-50"
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
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
