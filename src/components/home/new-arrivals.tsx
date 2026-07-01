"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { ProductGrid } from "@/components/product/product-grid"
import { useApp } from "@/lib/store"

export function NewArrivals() {
  const { state } = useApp()
  const newItems = state.products.filter((p) => p.isNew).slice(0, 4)

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">New Arrivals</h2>
            <p className="text-muted-foreground">Fresh from our inventory</p>
          </div>
          <Badge variant="new" className="text-xs">Just In</Badge>
        </motion.div>

        <ProductGrid products={newItems} />
      </div>
    </section>
  )
}
