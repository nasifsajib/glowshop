"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useApp } from "@/lib/store"

const catImages: Record<string, string> = {
  Skincare: "https://images.unsplash.com/photo-1570194065650-d99fb4b38e34?w=300&q=80",
  Makeup: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&q=80",
  "Hair Care": "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=300&q=80",
  "Body Care": "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=300&q=80",
  Sunscreen: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&q=80",
  Fragrance: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&q=80",
  "Korean Beauty": "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=300&q=80",
}

export function Categories() {
  const { state } = useApp()
  const categories = state.categories
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
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-sm group-hover:shadow-lg group-hover:shadow-primary/20 group-hover:scale-105 transition-all duration-300">
                  <Image
                    src={catImages[cat.name] || "https://images.unsplash.com/photo-1570194065650-d99fb4b38e34?w=300&q=80"}
                    alt={cat.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
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
