"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Edit, Trash2, Search, Package, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/utils"

export default function AdminProductsPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState<string>("newest")

  useEffect(() => {
    if (!state.user || state.user.role !== "admin") router.push("/admin/login")
  }, [state.user, router])

  if (!state.user || state.user.role !== "admin") return null

  const filtered = state.products
    .filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name)
      if (sort === "price") return a.price - b.price
      if (sort === "stock") return a.stock - b.stock
      return 0
    })

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Delete "${name}"? This cannot be undone.`)) {
      dispatch({ type: "ADMIN_DELETE_PRODUCT", payload: id })
      toast({ title: "Deleted", description: `${name} has been removed.` })
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2 font-bold">
            <span className="text-primary">✦</span> GlowShop <span className="text-xs text-muted-foreground font-normal">Admin</span>
          </Link>
          <Button asChild variant="premium" size="sm">
            <Link href="/admin/products/new"><Plus className="h-3.5 w-3.5" /> Add Product</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-muted-foreground">{state.products.length} total</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="pl-9 h-10" />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="h-10 rounded-xl border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring" aria-label="Sort">
              <option value="newest">Newest</option>
              <option value="name">Name</option>
              <option value="price">Price</option>
              <option value="stock">Stock</option>
            </select>
          </div>
        </div>

        <div className="rounded-xl border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-4 font-medium">Product</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Category</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Price</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Stock</th>
                  <th className="text-left p-4 font-medium hidden lg:table-cell">Status</th>
                  <th className="text-right p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <motion.tr
                    key={p.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.02 }}
                    className="border-b last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium truncate max-w-[200px]">{p.name}</p>
                          <p className="text-xs text-muted-foreground">{p.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 hidden sm:table-cell text-muted-foreground">{p.category}</td>
                    <td className="p-4 hidden md:table-cell font-medium">{formatPrice(p.price)}</td>
                    <td className="p-4 hidden md:table-cell">
                      <span className={p.stock > 10 ? "text-emerald-600" : p.stock > 0 ? "text-amber-600" : "text-red-600"}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {p.isNew && <Badge variant="new" className="text-[10px]">New</Badge>}
                        {p.isBestSeller && <Badge variant="success" className="text-[10px]">Best</Badge>}
                        {p.isFlashSale && <Badge variant="warning" className="text-[10px]">Sale</Badge>}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                          <Link href={`/admin/products/${p.id}/edit`}><Edit className="h-3.5 w-3.5" /></Link>
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600" onClick={() => handleDelete(p.id, p.name)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
