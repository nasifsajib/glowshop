"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Upload, X, Plus, Save, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"
import { updateProduct, deleteProduct } from "@/lib/api"

const skinTypes = ["All", "Normal", "Oily", "Dry", "Combination", "Sensitive"]
const productTypeOptions = ["Serum", "Moisturizer", "Cleanser", "Toner", "Mask", "Oil", "Tint", "Lipstick", "Treatment", "Eye Cream", "Mist", "Body Butter", "Sunscreen", "Essence", "Powder", "Spray", "Scrub", "Lotion", "Perfume", "Bronzer", "Mascara"]

export default function EditProductPage() {
  const router = useRouter()
  const params = useParams()
  const { state, dispatch } = useApp()
  const brandOptions = state.brands.map((b) => b.name)
  const categoryOptions = state.categories.map((c) => c.name)
  const [saving, setSaving] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [videos, setVideos] = useState<string[]>([])
  const [benefits, setBenefits] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>(["All"])
  const [form, setForm] = useState({
    name: "", brand: "GlowLab", category: "Skincare", subCategory: "",
    description: "", ingredients: "", howToUse: "",
    price: "", originalPrice: "", stock: "",
    productType: "Serum", discount: "0",
    rating: "4.0", reviewCount: "0",
    isNew: false, isBestSeller: false, isTrending: false, isFlashSale: false,
    flashSaleEnds: "",
  })

  useEffect(() => {
    if (!state.user || state.user.role !== "admin") { router.push("/login"); return }
    const product = state.products.find((p) => p.id === params.id)
    if (!product) { router.push("/admin/products"); return }
    setForm({
      name: product.name, brand: product.brand, category: product.category, subCategory: product.subCategory,
      description: product.description, ingredients: product.ingredients, howToUse: product.howToUse,
      price: String(product.price), originalPrice: String(product.originalPrice), stock: String(product.stock),
      productType: product.productType, discount: String(product.discount),
      rating: String(product.rating), reviewCount: String(product.reviewCount),
      isNew: product.isNew, isBestSeller: product.isBestSeller, isTrending: product.isTrending,
      isFlashSale: product.isFlashSale, flashSaleEnds: product.flashSaleEnds || "",
    })
    setImages(product.images)
    setVideos(product.videos || [])
    setBenefits(product.benefits)
    setTags(product.tags)
    setSelectedSkinTypes(product.skinType)
  }, [state.user, state.products, params.id, router])

  if (!state.user || state.user.role !== "admin") return null

  const product = state.products.find((p) => p.id === params.id)
  if (!product) return null

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => { if (ev.target?.result) setImages((prev) => [...prev, ev.target!.result as string]) }
      reader.readAsDataURL(file)
    })
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (ev) => { if (ev.target?.result) setVideos((prev) => [...prev, ev.target!.result as string]) }
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    const price = parseFloat(form.price)
    const originalPrice = parseFloat(form.originalPrice) || price
    const discount = Math.round(((originalPrice - price) / originalPrice) * 100)

    const updated = {
      ...product,
      name: form.name, brand: form.brand, category: form.category, subCategory: form.subCategory,
      description: form.description, ingredients: form.ingredients, howToUse: form.howToUse,
      price, originalPrice, discount,
      rating: parseFloat(form.rating) || 4, reviewCount: parseInt(form.reviewCount) || 0,
      images, videos, skinType: selectedSkinTypes, productType: form.productType,
      stock: parseInt(form.stock) || 0, benefits, tags,
      isNew: form.isNew, isBestSeller: form.isBestSeller, isTrending: form.isTrending,
      isFlashSale: form.isFlashSale, flashSaleEnds: form.isFlashSale ? form.flashSaleEnds || undefined : undefined,
    }

    try {
      await updateProduct(product.id, updated)
      dispatch({ type: "ADMIN_UPDATE_PRODUCT", payload: updated })
      toast({ title: "Product Updated", description: `${updated.name} has been saved.`, variant: "success" })
      router.push("/admin/products")
    } catch (err) {
      toast({ title: "Error", description: "Failed to update product.", variant: "error" })
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (confirm(`Delete "${product.name}"? This cannot be undone.`)) {
      try {
        await deleteProduct(product.id)
        dispatch({ type: "ADMIN_DELETE_PRODUCT", payload: product.id })
        toast({ title: "Deleted" })
        router.push("/admin/products")
      } catch {
        toast({ title: "Error", description: "Failed to delete product.", variant: "error" })
      }
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon"><Link href="/admin/products"><ArrowLeft className="h-5 w-5" /></Link></Button>
            <span className="font-bold truncate">Edit: {product.name}</span>
          </div>
          <Button variant="destructive" size="sm" onClick={handleDelete}><Trash2 className="h-3.5 w-3.5" /> Delete</Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit} className="space-y-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-2xl border bg-card space-y-6">
            <h2 className="font-semibold text-lg">Basic Information</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2 space-y-2">
                <Label>Product Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div className="space-y-2">
                <Label>Brand</Label>
                <Input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} list="brands-list" />
                <datalist id="brands-list">{brandOptions.map((b) => <option key={b} value={b} />)}</datalist>
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} list="categories-list" />
                <datalist id="categories-list">{categoryOptions.map((c) => <option key={c} value={c} />)}</datalist>
              </div>
              <div className="space-y-2"><Label>Sub Category</Label><Input value={form.subCategory} onChange={(e) => setForm({ ...form, subCategory: e.target.value })} /></div>
              <div className="space-y-2">
                <Label>Product Type</Label>
                <Input value={form.productType} onChange={(e) => setForm({ ...form, productType: e.target.value })} list="ptypes-list" />
                <datalist id="ptypes-list">{productTypeOptions.map((t) => <option key={t} value={t} />)}</datalist>
              </div>
            </div>
            <div className="space-y-2"><Label>Description</Label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="p-6 rounded-2xl border bg-card space-y-6">
            <h2 className="font-semibold text-lg">Images &amp; Videos</h2>
            <div className="space-y-2">
              <Label>Product Images</Label>
              <label className="flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-muted-foreground/30 cursor-pointer hover:border-primary/50 transition-colors">
                <div className="text-center"><Upload className="h-6 w-6 mx-auto mb-1 text-muted-foreground" /><p className="text-sm text-muted-foreground">Click to upload images</p></div>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} />
              </label>
              {images.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-3">
                  {images.map((src, i) => (
                    <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => setImages((p) => p.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Videos</Label>
              <label className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-muted-foreground/30 cursor-pointer hover:border-primary/50 transition-colors">
                <div className="text-center"><Upload className="h-5 w-5 mx-auto mb-1 text-muted-foreground" /><p className="text-sm text-muted-foreground">Click to upload videos</p></div>
                <input type="file" accept="video/*" multiple className="hidden" onChange={handleVideoUpload} />
              </label>
              {videos.length > 0 && (
                <div className="flex gap-2 flex-wrap mt-3">
                  {videos.map((src, i) => (
                    <div key={i} className="relative w-32 h-20 rounded-lg overflow-hidden bg-muted group">
                      <video src={src} className="w-full h-full object-cover" controls />
                      <button type="button" onClick={() => setVideos((p) => p.filter((_, j) => j !== i))} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X className="h-3 w-3" /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl border bg-card space-y-6">
            <h2 className="font-semibold text-lg">Pricing &amp; Stock</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="space-y-2"><Label>Selling Price ($) *</Label><Input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
              <div className="space-y-2"><Label>Original Price ($)</Label><Input type="number" step="0.01" value={form.originalPrice} onChange={(e) => setForm({ ...form, originalPrice: e.target.value })} /></div>
              <div className="space-y-2"><Label>Stock</Label><Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} /></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 rounded-2xl border bg-card space-y-6">
            <h2 className="font-semibold text-lg">Details</h2>
            <div className="space-y-2"><Label>Ingredients</Label><textarea value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })} rows={3} className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>
            <div className="space-y-2"><Label>How to Use</Label><textarea value={form.howToUse} onChange={(e) => setForm({ ...form, howToUse: e.target.value })} rows={3} className="w-full rounded-xl border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none" /></div>

            <div className="space-y-2">
              <Label>Benefits</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {benefits.map((b, i) => (
                  <Badge key={i} variant="secondary" className="gap-1">{b} <button type="button" onClick={() => setBenefits((p) => p.filter((_, j) => j !== i))}><X className="h-3 w-3" /></button></Badge>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => { const v = prompt("Enter benefit:")?.trim(); if (v) setBenefits((p) => [...p, v]) }}><Plus className="h-3 w-3" /> Add</Button>
            </div>

            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {tags.map((t, i) => (
                  <Badge key={i} variant="secondary" className="gap-1">{t} <button type="button" onClick={() => setTags((p) => p.filter((_, j) => j !== i))}><X className="h-3 w-3" /></button></Badge>
                ))}
              </div>
              <Button type="button" variant="outline" size="sm" onClick={() => { const v = prompt("Enter tag:")?.trim(); if (v) setTags((p) => [...p, v]) }}><Plus className="h-3 w-3" /> Add</Button>
            </div>

            <div className="space-y-2">
              <Label>Skin Types</Label>
              <div className="flex flex-wrap gap-2">
                {skinTypes.map((type) => (
                  <button key={type} type="button" onClick={() => setSelectedSkinTypes((p) => p.includes(type) ? p.filter((s) => s !== type) : [...p, type])}
                    className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${selectedSkinTypes.includes(type) ? "bg-primary text-primary-foreground border-primary" : "bg-background text-muted-foreground border-input"}`}>
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl border bg-card space-y-6">
            <h2 className="font-semibold text-lg">Flags &amp; Status</h2>
            <div className="flex flex-wrap gap-4">
              {(["isNew", "isBestSeller", "isTrending", "isFlashSale"] as const).map((flag) => (
                <label key={flag} className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form[flag]} onChange={(e) => setForm({ ...form, [flag]: e.target.checked })} className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary" />
                  <span className="text-sm capitalize">{flag.replace("is", "")}</span>
                </label>
              ))}
            </div>
            {form.isFlashSale && (
              <div className="space-y-2"><Label>Flash Sale End</Label><Input type="datetime-local" value={form.flashSaleEnds} onChange={(e) => setForm({ ...form, flashSaleEnds: e.target.value })} /></div>
            )}
          </motion.div>

          <div className="flex justify-end gap-3 pb-8">
            <Button asChild variant="outline"><Link href="/admin/products">Cancel</Link></Button>
            <Button type="submit" variant="premium" disabled={saving || !form.name}>
              <Save className="h-4 w-4" /> {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
