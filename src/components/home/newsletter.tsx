"use client"

import { motion } from "framer-motion"
import { Heart, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border p-8 sm:p-12 text-center"
        >
          <Sparkles className="absolute top-4 right-4 h-6 w-6 text-primary/20" />
          <Sparkles className="absolute bottom-4 left-4 h-4 w-4 text-primary/20" />
          <div className="max-w-lg mx-auto">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold font-heading mb-2">
              Join the Glow Community
            </h3>
            <p className="text-muted-foreground mb-6">
              Get 10% off your first order + exclusive access to new launches, beauty tips, and special offers.
            </p>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-12"
                aria-label="Email for newsletter"
              />
              <Button className="h-12 px-6 shrink-0" variant="premium">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              By subscribing, you agree to our Privacy Policy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
