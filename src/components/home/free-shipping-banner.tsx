"use client"

import { motion } from "framer-motion"
import { Truck } from "lucide-react"

export function FreeShippingBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container mx-auto px-4 py-4"
    >
      <div className="flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200/50 dark:border-emerald-800/30 px-6 py-3">
        <Truck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
        <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">
          <span className="font-bold">Free Shipping</span> on all orders over 1,999 BDT &mdash; Use code{" "}
          <span className="font-mono font-bold">FREESHIP</span>
        </p>
      </div>
    </motion.div>
  )
}
