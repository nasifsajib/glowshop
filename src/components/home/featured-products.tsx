"use client"

import { motion } from "framer-motion"
import { ProductGrid } from "@/components/product/product-grid"
import { products } from "@/lib/data"

export function FeaturedProducts() {
  const featured = products.filter((p) => p.isBestSeller).slice(0, 8)

  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">Featured Products</h2>
          <p className="text-muted-foreground mt-2">Our most loved products, handpicked for you</p>
        </motion.div>

        <ProductGrid products={featured} />
      </div>
    </section>
  )
}
