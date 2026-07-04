"use client"

import { useState, useEffect } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { motion } from "framer-motion"
import { getSocialLinks, fetchSocialLinksFromDB, saveSocialLinks } from "@/lib/socials"

export function WhatsAppChat() {
  const [href, setHref] = useState("https://wa.me/1234567890")

  useEffect(() => {
    // Load from cache first
    const cached = getSocialLinks()
    if (cached.whatsapp && cached.whatsapp !== "#") setHref(cached.whatsapp)
    // Then fetch latest from Supabase
    fetchSocialLinksFromDB().then((db) => {
      if (db?.whatsapp && db.whatsapp !== "#") {
        setHref(db.whatsapp)
        saveSocialLinks(db)
      }
    })
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
      <FaWhatsapp className="h-7 w-7" />
    </motion.a>
  )
}
