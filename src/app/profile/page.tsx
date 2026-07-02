"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { User, Mail, Phone, Edit2, Package, MapPin, LogOut, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"

const menuItems = [
  { icon: Package, label: "Order History", href: "/account?tab=orders", color: "text-blue-500" },
  { icon: MapPin, label: "Address Book", href: "/addresses", color: "text-emerald-500" },
  { icon: Heart, label: "Wishlist", href: "/account?tab=wishlist", color: "text-red-500" },
]

function Heart({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

export default function ProfilePage() {
  const { state } = useApp()

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-2xl sm:text-3xl font-bold font-heading mb-8">My Profile</h1>

        {/* Profile Card */}
        <div className="p-6 rounded-2xl border bg-card mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 to-accent flex items-center justify-center text-2xl font-bold text-primary">
              N
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold">Nasif Ahmed</h2>
              <p className="text-sm text-muted-foreground">Member since June 2026</p>
            </div>
            <Button variant="outline" size="icon" aria-label="Edit profile">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 rounded-2xl border bg-card mb-6">
          <h3 className="font-semibold mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm">nasif@example.com</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="text-sm">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>

        {/* Quick Menu */}
        <div className="rounded-2xl border bg-card overflow-hidden mb-6">
          {menuItems.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between px-6 py-4 hover:bg-muted/50 transition-colors ${i < menuItems.length - 1 ? "border-b" : ""}`}
            >
              <div className="flex items-center gap-3">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
          <LogOut className="h-4 w-4" /> Sign Out
        </Button>
      </motion.div>
    </div>
  )
}
