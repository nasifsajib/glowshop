"use client"

import { motion } from "framer-motion"
import { Tag, Copy, Check } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const coupons = [
  { code: "GLOW10", discount: "10% OFF", desc: "On your first order" },
  { code: "FREESHIP", discount: "Free Shipping", desc: "On orders over 1,999 BDT" },
  { code: "B2G1", discount: "Buy 2 Get 1", desc: "On all skincare" },
]

export function CouponBanner() {
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section className="py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Tag className="h-4 w-4 text-primary" />
            <h3 className="text-lg font-semibold">Exclusive Offers</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            {coupons.map((coupon) => (
              <div
                key={coupon.code}
                className="relative overflow-hidden rounded-xl border-2 border-dashed border-primary/30 bg-gradient-to-br from-secondary to-background p-4 group cursor-pointer hover:border-primary/60 transition-colors"
                onClick={() => handleCopy(coupon.code)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-primary">{coupon.discount}</p>
                    <p className="text-xs text-muted-foreground">{coupon.desc}</p>
                    <code className="inline-block mt-2 px-2 py-0.5 rounded bg-primary/10 text-xs font-mono font-semibold text-primary">
                      {coupon.code}
                    </code>
                  </div>
                  <button
                    className={cn(
                      "flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-full transition-all",
                      copied === coupon.code
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    )}
                    aria-label={`Copy coupon code ${coupon.code}`}
                  >
                    {copied === coupon.code ? (
                      <>
                        <Check className="h-3 w-3" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
