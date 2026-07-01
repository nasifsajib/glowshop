"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { brands } from "@/lib/data"

export function ShopByBrand() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">Shop by Brand</h2>
          <p className="text-muted-foreground mt-2">Discover premium beauty brands</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/products?brand=${encodeURIComponent(brand.name)}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl border bg-card hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center text-xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                  {brand.name.charAt(0)}
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {brand.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{brand.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
