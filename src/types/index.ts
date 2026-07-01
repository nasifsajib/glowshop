export interface Product {
  id: string
  name: string
  slug?: string
  brand: string
  category: string
  subCategory: string
  description: string
  ingredients: string
  benefits: string[]
  howToUse: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  images: string[]
  videos: string[]
  skinType: string[]
  productType: string
  stock: number
  isNew: boolean
  isBestSeller: boolean
  isTrending: boolean
  isFlashSale: boolean
  flashSaleEnds?: string
  tags: string[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar: string
  rating: number
  title: string
  comment: string
  date: string
  likes: number
}

export interface Category {
  id: string
  name: string
  image: string
  itemCount: number
}

export interface Brand {
  id: string
  name: string
  logo: string
  description: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  image: string
  author: string
  date: string
  category: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  address: Address
}

export interface Address {
  id: string
  fullName: string
  street: string
  city: string
  state: string
  zip: string
  phone: string
  isDefault: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  phone: string
  role: 'user' | 'admin'
}
