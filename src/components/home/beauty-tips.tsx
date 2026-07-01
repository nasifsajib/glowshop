"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Calendar, ArrowRight } from "lucide-react"
import { useApp } from "@/lib/store"
import { Badge } from "@/components/ui/badge"

const blogImages: Record<string, string> = {
  b1: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
  b2: "https://images.unsplash.com/photo-1570194065650-d99fb4b38e34?w=600&q=80",
  b3: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&q=80",
  b4: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600&q=80",
}

export function BeautyTips() {
  const { state } = useApp()
  const blogPosts = state.blogPosts
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
                <div className="aspect-[16/9] overflow-hidden">
                  <Image
                    src={blogImages[post.id] || "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80"}
                    alt={post.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
