"use client"

import { useState, useEffect } from "react"
import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"
import { getSocialLinks } from "@/lib/socials"

export function WhatsAppChat() {
  const [href, setHref] = useState("https://wa.me/1234567890")

  useEffect(() => {
    const links = getSocialLinks()
    if (links.whatsapp && links.whatsapp !== "#") setHref(links.whatsapp)
  }, [])

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all duration-300 active:scale-90"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <MessageCircle className="h-6 w-6" />
    </motion.a>
  )
}
