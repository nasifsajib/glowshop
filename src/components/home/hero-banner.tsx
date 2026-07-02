"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const slides = [
  {
    id: 1,
    title: "Spring Glow Collection",
    subtitle: "Radiance starts here",
    description: "Discover our curated collection of brightening serums, lightweight moisturizers, and SPF essentials for your spring skincare routine.",
    cta: "Shop the Collection",
    href: "/products?category=Skincare",
    bg: "from-rose-100/80 via-pink-50/50 to-white dark:from-rose-950/30 dark:via-pink-950/20 dark:to-background",
    accent: "bg-gradient-to-r from-[#d4839a] to-[#e8a0b5]",
    image: "/images/sgc.webp",
  },
  {
    id: 2,
    title: "Korean Beauty Essentials",
    subtitle: "Glass skin achieved",
    description: "From rice toners to snail mucin, explore our K-Beauty collection for that coveted glass skin glow.",
    cta: "Explore K-Beauty",
    href: "/products?category=Korean+Beauty",
    bg: "from-violet-100/80 via-purple-50/50 to-white dark:from-violet-950/30 dark:via-purple-950/20 dark:to-background",
    accent: "bg-gradient-to-r from-[#c9b8e0] to-[#a78bdb]",
    image: "/images/kbeauty.jpg",
  },
]

export function HeroBanner() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), [])
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), [])

  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section className="relative overflow-hidden">
      <div className="container mx-auto px-4 py-6 sm:py-10">
        <div className="relative overflow-hidden rounded-3xl">
          <div className={cn("relative overflow-hidden", slides[current].bg)}>
            <div className="grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16 min-h-[400px] lg:min-h-[500px]">
              <div className="flex flex-col justify-center z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-4"
                  >
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                      {slides[current].subtitle}
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-heading leading-tight">
                      {slides[current].title}
                    </h2>
                    <p className="text-muted-foreground max-w-md text-sm sm:text-base leading-relaxed">
                      {slides[current].description}
                    </p>
                    <Button asChild size="lg" className="mt-2" variant="premium">
                      <Link href={slides[current].href}>{slides[current].cta}</Link>
                    </Button>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Image */}
              <div className="hidden lg:flex items-center justify-center relative">
                <div className="absolute w-80 h-80 rounded-full bg-white/20 dark:bg-white/5 blur-3xl" />
                <div className="relative w-72 h-72 rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={slides[current].image}
                    alt={slides[current].title}
                    fill
                    className="object-cover"
                    sizes="288px"
                  />
                </div>
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-background transition-colors z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    i === current ? "w-8 bg-primary" : "w-2 bg-primary/30 hover:bg-primary/50"
                  )}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
