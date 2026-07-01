"use client"

import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { reviews } from "@/lib/reviews"

export function CustomerReviews() {
  const topReviews = reviews.slice(0, 4)

  return (
    <section className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold font-heading">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground mt-2">Real reviews from real people</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topReviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="relative p-6 rounded-xl border bg-card"
            >
              <Quote className="h-6 w-6 text-primary/20 absolute top-4 right-4" />
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold mb-1">{review.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                &ldquo;{review.comment}&rdquo;
              </p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center text-xs font-bold text-primary">
                  {review.userName.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium">{review.userName}</p>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
