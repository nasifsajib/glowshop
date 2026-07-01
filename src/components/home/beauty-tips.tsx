"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { blogPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"

export function BeautyTips() {
  return (
    <section className="py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading">Beauty Tips &amp; Blog</h2>
            <p className="text-muted-foreground mt-2">Expert advice for your beauty journey</p>
          </div>
          <Link
            href="#"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All <ArrowRight className="h-3 w-3" />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link
                href="#"
                className="group block rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-secondary to-primary/10 flex items-center justify-center overflow-hidden">
                  <div className="text-5xl opacity-20 group-hover:scale-110 transition-transform duration-500">
                    ✦
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <Badge variant="secondary" className="text-[10px]">
                    {post.category}
                  </Badge>
                  <h3 className="font-semibold text-sm leading-snug group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                    <span>&middot;</span>
                    <span>{post.author}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="#" className="text-sm text-primary hover:underline font-medium">
            View All Articles &rarr;
          </Link>
        </div>
      </div>
    </section>
  )
}
