"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Package, ChevronRight, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, cn } from "@/lib/utils"
import { useApp } from "@/lib/store"

const statusColors: Record<string, "default" | "secondary" | "success" | "warning" | "destructive"> = {
  delivered: "success",
  shipped: "secondary",
  confirmed: "default",
  pending: "warning",
  cancelled: "destructive",
}

export default function OrdersPage() {
  const { state } = useApp()

  const orders = [
    {
      id: "ORD-2026-001",
      date: "June 25, 2026",
      status: "delivered" as const,
      total: 72.00,
      items: state.cart.length ? state.cart : [{ product: { id: "p1", name: "Vitamin C Brightening Serum", brand: "GlowLab", price: 38 } as any, quantity: 1 }, { product: { id: "p10", name: "Sunscreen SPF 50+", brand: "PureGlow", price: 24, originalPrice: 30, discount: 20 } as any, quantity: 1 }],
    },
    {
      id: "ORD-2026-002",
      date: "June 18, 2026",
      status: "shipped" as const,
      total: 34.00,
      items: [{ product: { id: "p2", name: "Hyaluronic Acid Moisture Cream", brand: "DewySkin", price: 34, originalPrice: 45, discount: 24 } as any, quantity: 1 }],
    },
  ]

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="text-6xl mb-4 opacity-20">✦</div>
        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold mb-2">No Orders Yet</h1>
        <p className="text-muted-foreground mb-6">Start shopping to see your orders here.</p>
        <Button asChild variant="premium"><Link href="/products">Shop Now</Link></Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/profile"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Order History</h1>
          <p className="text-sm text-muted-foreground">{orders.length} orders</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {orders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-4 sm:p-6 rounded-2xl border bg-card"
          >
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
                  <img src={(item.product as any).images?.[0] || ""} alt={item.product.name} className="w-12 h-12 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <span className="text-sm font-semibold">Total: {formatPrice(order.total)}</span>
              <Button variant="ghost" size="sm" className="text-xs">
                View Details <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
