import { supabase } from "./supabase"
import type { Product, Category, Brand, Review, BlogPost } from "@/types"

const mapProduct = (p: any): Product => ({
  id: p.id,
  name: p.name,
  slug: p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
  brand: p.brand,
  category: p.category,
  subCategory: p.sub_category || "",
  description: p.description || "",
  ingredients: p.ingredients || "",
  benefits: p.benefits || [],
  howToUse: p.how_to_use || "",
  price: Number(p.price),
  originalPrice: p.original_price ? Number(p.original_price) : Number(p.price),
  discount: p.discount || 0,
  rating: Number(p.rating) || 4,
  reviewCount: p.review_count || 0,
  images: p.images || [],
  videos: p.videos || [],
  skinType: p.skin_type || [],
  productType: p.product_type || "",
  stock: p.stock || 0,
  isNew: p.is_new || false,
  isBestSeller: p.is_best_seller || false,
  isTrending: p.is_trending || false,
  isFlashSale: p.is_flash_sale || false,
  flashSaleEnds: p.flash_sale_ends || undefined,
  tags: p.tags || [],
})

const mapCategory = (c: any): Category => ({
  id: String(c.id),
  name: c.name,
  image: c.image || "",
  itemCount: c.item_count || 0,
})

const mapBrand = (b: any): Brand => ({
  id: String(b.id),
  name: b.name,
  logo: b.logo || "",
  description: b.description || "",
})

const mapReview = (r: any): Review => ({
  id: r.id,
  userId: r.user_id || "",
  userName: r.user_name || "",
  userAvatar: "",
  rating: r.rating,
  title: r.title || "",
  comment: r.comment || "",
  date: r.created_at?.split("T")[0] || "",
  likes: r.likes || 0,
})

const mapBlogPost = (b: any): BlogPost => ({
  id: b.id,
  title: b.title,
  excerpt: b.excerpt || "",
  image: b.image || "",
  author: b.author || "",
  date: b.date || "",
  category: b.category || "",
})

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select("*")
  if (error) throw error
  return (data || []).map(mapProduct)
}

export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from("categories").select("*")
  if (error) throw error
  return (data || []).map(mapCategory)
}

export async function fetchBrands(): Promise<Brand[]> {
  const { data, error } = await supabase.from("brands").select("*")
  if (error) throw error
  return (data || []).map(mapBrand)
}

export async function fetchReviews(): Promise<Review[]> {
  const { data, error } = await supabase.from("reviews").select("*")
  if (error) throw error
  return (data || []).map(mapReview)
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase.from("blog_posts").select("*")
  if (error) throw error
  return (data || []).map(mapBlogPost)
}

export async function createProduct(product: Omit<Product, "id" | "slug"> & { id: string }): Promise<void> {
  const slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  const { error } = await supabase.from("products").insert({
    id: product.id,
    name: product.name,
    slug,
    brand: product.brand,
    category: product.category,
    sub_category: product.subCategory || "",
    description: product.description || "",
    ingredients: product.ingredients || "",
    benefits: product.benefits || [],
    how_to_use: product.howToUse || "",
    price: product.price,
    original_price: product.originalPrice || product.price,
    discount: product.discount || 0,
    rating: product.rating || 4,
    review_count: product.reviewCount || 0,
    images: product.images || [],
    videos: product.videos || [],
    skin_type: product.skinType || [],
    product_type: product.productType || "",
    stock: product.stock || 0,
    is_new: product.isNew || false,
    is_best_seller: product.isBestSeller || false,
    is_trending: product.isTrending || false,
    is_flash_sale: product.isFlashSale || false,
    flash_sale_ends: product.flashSaleEnds || null,
    tags: product.tags || [],
  })
  if (error) throw error
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<void> {
  const updates: any = {}
  if (product.name !== undefined) {
    updates.name = product.name
    updates.slug = product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }
  if (product.brand !== undefined) updates.brand = product.brand
  if (product.category !== undefined) updates.category = product.category
  if (product.subCategory !== undefined) updates.sub_category = product.subCategory
  if (product.description !== undefined) updates.description = product.description
  if (product.ingredients !== undefined) updates.ingredients = product.ingredients
  if (product.benefits !== undefined) updates.benefits = product.benefits
  if (product.howToUse !== undefined) updates.how_to_use = product.howToUse
  if (product.price !== undefined) updates.price = product.price
  if (product.originalPrice !== undefined) updates.original_price = product.originalPrice
  if (product.discount !== undefined) updates.discount = product.discount
  if (product.rating !== undefined) updates.rating = product.rating
  if (product.reviewCount !== undefined) updates.review_count = product.reviewCount
  if (product.images !== undefined) updates.images = product.images
  if (product.videos !== undefined) updates.videos = product.videos
  if (product.skinType !== undefined) updates.skin_type = product.skinType
  if (product.productType !== undefined) updates.product_type = product.productType
  if (product.stock !== undefined) updates.stock = product.stock
  if (product.isNew !== undefined) updates.is_new = product.isNew
  if (product.isBestSeller !== undefined) updates.is_best_seller = product.isBestSeller
  if (product.isTrending !== undefined) updates.is_trending = product.isTrending
  if (product.isFlashSale !== undefined) updates.is_flash_sale = product.isFlashSale
  if (product.flashSaleEnds !== undefined) updates.flash_sale_ends = product.flashSaleEnds || null
  if (product.tags !== undefined) updates.tags = product.tags

  const { error } = await supabase.from("products").update(updates).eq("id", id)
  if (error) throw error
}

export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from("products").delete().eq("id", id)
  if (error) throw error
}
