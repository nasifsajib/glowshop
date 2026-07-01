"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { categories } from "@/lib/data"

const iconMap: Record<string, string> = {
  Skincare: "✨",
  Makeup: "💄",
  "Hair Care": "💇‍♀️",
  "Body Care": "🧴",
  Sunscreen: "☀️",
  Fragrance: "🌸",
  "Korean Beauty": "🇰🇷",
}

export function Categories() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Find exactly what your skin needs</p>
        </div>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center gap-3 min-w-[100px] group"
              >
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-secondary via-secondary to-primary/10 flex items-center justify-center text-2xl sm:text-3xl shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 transition-all duration-300">
                  {iconMap[cat.name] || "✦"}
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium group-hover:text-primary transition-colors">
                    {cat.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{cat.itemCount} items</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
