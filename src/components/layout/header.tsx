"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/ui/search-bar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useApp } from "@/lib/store"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop All" },
  { href: "/products?category=Skincare", label: "Skincare" },
  { href: "/products?category=Makeup", label: "Makeup" },
  { href: "/products?category=Korean+Beauty", label: "K-Beauty" },
]

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [categoryOpen, setCategoryOpen] = useState(false)
  const { state } = useApp()

  const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      {/* Top announcement bar */}
      <div className="hidden sm:block bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-1.5 text-center text-xs text-muted-foreground">
          <span className="font-medium text-primary">Free shipping</span> on orders over $50 &middot; Use code{" "}
          <span className="font-semibold text-foreground">GLOW10</span> for 10% off
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden -ml-2 p-2 rounded-full hover:bg-muted transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-bold bg-gradient-to-r from-[#d4839a] to-[#e8a0b5] bg-clip-text text-transparent">
              ✦
            </span>
            <span className="text-xl font-bold tracking-tight">
              Glow<span className="text-primary">Shop</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
            <div className="relative">
              <button
                onMouseEnter={() => setCategoryOpen(true)}
                onMouseLeave={() => setCategoryOpen(false)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
              >
                Categories <ChevronDown className="h-3 w-3" />
              </button>
              <AnimatePresence>
                {categoryOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    onMouseEnter={() => setCategoryOpen(true)}
                    onMouseLeave={() => setCategoryOpen(false)}
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border bg-card shadow-xl overflow-hidden"
                  >
                    <div className="p-2">
                      {state.categories.map((cat) => (
                        <Link
                          key={cat.id}
                          href={`/products?category=${encodeURIComponent(cat.name)}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
                        >
                          <span>{cat.name}</span>
                          <span className="text-xs text-muted-foreground">{state.products.filter(p => p.category === cat.name).length}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Search bar */}
          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-muted transition-colors hidden sm:block"
              aria-label="Wishlist"
            >
              <Heart className="h-5 w-5" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {state.wishlist.length}
                </span>
              )}
            </Link>
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <Link
              href={state.user ? (state.user.role === "admin" ? "/admin" : "/account") : "/login"}
              className="p-2 rounded-full hover:bg-muted transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <Button asChild className="hidden sm:inline-flex ml-2" size="sm">
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t lg:hidden overflow-hidden"
          >
            <div className="container px-4 py-4 space-y-4">
              <SearchBar />
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-2 border-t">
                  <p className="px-3 py-1 text-xs font-medium text-muted-foreground">CATEGORIES</p>
                  {state.categories.slice(0, 6).map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/products?category=${encodeURIComponent(cat.name)}`}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm hover:bg-muted transition-colors"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs text-muted-foreground">{cat.itemCount}</span>
                    </Link>
                  ))}
                </div>
              </nav>
              <div className="flex items-center gap-2 pt-2 border-t">
                <Link
                  href="/wishlist"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  <Heart className="h-4 w-4" /> Wishlist ({state.wishlist.length})
                </Link>
                <Link
                  href={state.user ? (state.user.role === "admin" ? "/admin" : "/account") : "/login"}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-muted transition-colors"
                >
                  <User className="h-4 w-4" /> Account
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
