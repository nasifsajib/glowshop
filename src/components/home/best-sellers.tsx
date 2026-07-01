"use client"

import { motion } from "framer-motion"
import { ProductGrid } from "@/components/product/product-grid"
import { useApp } from "@/lib/store"

export function BestSellers() {
  const { state } = useApp()
  const bestSellers = state.products.filter((p) => p.isBestSeller).slice(0, 8)

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">Best Sellers</h2>
          <p className="text-muted-foreground mt-2">Products everyone is raving about</p>
        </motion.div>

        <ProductGrid products={bestSellers} />
      </div>
    </section>
  )
}
