"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Zap } from "lucide-react"
import { ProductGrid } from "@/components/product/product-grid"
import { Button } from "@/components/ui/button"
import { useApp } from "@/lib/store"

function CountdownTimer({ endDate }: { endDate: string }) {
  const [time, setTime] = useState({ hours: "--" as string | number, minutes: "--" as string | number, seconds: "--" as string | number })

  useEffect(() => {
    const calc = () => {
      const diff = new Date(endDate).getTime() - new Date().getTime()
      if (diff <= 0) return { hours: "00", minutes: "00", seconds: "00" }
      return {
        hours: String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, "0"),
        minutes: String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, "0"),
        seconds: String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, "0"),
      }
    }
    setTime(calc())
    const timer = setInterval(() => setTime(calc()), 1000)
    return () => clearInterval(timer)
  }, [endDate])

  return (
    <div className="flex items-center gap-1 text-sm font-mono font-bold tabular-nums">
      <Clock className="h-4 w-4" />
      <span className="bg-primary/10 text-primary px-2 py-1 rounded-md">
        {time.hours}h {time.minutes}m {time.seconds}s
      </span>
    </div>
  )
}

export function FlashSale() {
  const { state } = useApp()
  const flashProducts = state.products.filter((p) => p.isFlashSale).slice(0, 4)

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-r from-rose-50/50 via-amber-50/30 to-rose-50/50 dark:from-rose-950/10 dark:via-amber-950/5 dark:to-rose-950/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="h-5 w-5 text-amber-500 fill-amber-500" />
              <h2 className="text-2xl sm:text-3xl font-bold font-heading">Flash Sale</h2>
            </div>
            <p className="text-muted-foreground">Best deals, limited time only</p>
          </div>
          <div className="flex items-center gap-4">
            {flashProducts[0]?.flashSaleEnds && (
              <CountdownTimer endDate={flashProducts[0].flashSaleEnds} />
            )}
            <Button asChild variant="outline" size="sm">
              <Link href="/products">View All</Link>
            </Button>
          </div>
        </div>

        <ProductGrid products={flashProducts} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 text-center"
        >
          <Link href="/products" className="text-sm text-primary hover:underline font-medium">
            Shop all flash deals &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
