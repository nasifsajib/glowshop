"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useApp } from "@/lib/store"

const brandImages: Record<string, string> = {
  GlowLab: "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=200&q=80",
  DewySkin: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&q=80",
  PureGlow: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80",
  VelvetTouch: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=200&q=80",
  BloomEssentials: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=200&q=80",
  RadianceCo: "https://images.unsplash.com/photo-1570194065650-d99fb4b38e34?w=200&q=80",
}

export function ShopByBrand() {
  const { state } = useApp()
  const brands = state.brands
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
                <div className="w-16 h-16 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={brandImages[brand.name] || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&q=80"}
                    alt={brand.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
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
