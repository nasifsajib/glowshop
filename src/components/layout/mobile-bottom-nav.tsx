"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react"
import { useApp } from "@/lib/store"
import { cn } from "@/lib/utils"

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "/products", label: "Shop", icon: Search },
  { href: "/wishlist", label: "Wishlist", icon: Heart, count: true },
  { href: "/cart", label: "Cart", icon: ShoppingBag, count: true },
  { href: "", label: "Account", icon: User, account: true },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { state } = useApp()

  const getCount = (item: typeof items[0]) => {
    if (!item.count) return 0
    if (item.href === "/wishlist") return state.wishlist.length
    if (item.href === "/cart") return state.cart.reduce((t, i) => t + i.quantity, 0)
    return 0
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-lg lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const href = item.account ? (state.user ? (state.user.role === "admin" ? "/admin" : "/account") : "/login") : item.href
          const Icon = item.icon
          const isActive = pathname === (item.account ? (state.user ? (state.user.role === "admin" ? "/admin" : "/account") : "/login") : item.href)
          const count = getCount(item)
          return (
            <Link
              key={item.label}
              href={href}
              className={cn(
                "relative flex flex-col items-center justify-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.label}
            >
              <div className="relative">
                <Icon className="h-5 w-5" />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-[8px] font-bold text-primary-foreground">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.label}</span>
              {isActive && (
                <span className="absolute -top-px left-1/2 -translate-x-1/2 h-0.5 w-6 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
