import { HeroBanner } from "@/components/home/hero-banner"
import { FreeShippingBanner } from "@/components/home/free-shipping-banner"
import { Categories } from "@/components/home/categories"
import { FeaturedProducts } from "@/components/home/featured-products"
import { FlashSale } from "@/components/home/flash-sale"
import { CouponBanner } from "@/components/home/coupon-banner"
import { BestSellers } from "@/components/home/best-sellers"
import { NewArrivals } from "@/components/home/new-arrivals"
import { TrendingProducts } from "@/components/home/trending-products"
import { ShopByBrand } from "@/components/home/shop-by-brand"
import { CustomerReviews } from "@/components/home/customer-reviews"
import { BeautyTips } from "@/components/home/beauty-tips"

export default function HomePage() {
  return (
    <>
      <HeroBanner />
      <FreeShippingBanner />
      <Categories />
      <FeaturedProducts />
      <FlashSale />
      <CouponBanner />
      <BestSellers />
      <NewArrivals />
      <TrendingProducts />
      <ShopByBrand />
      <CustomerReviews />
      <BeautyTips />
    </>
  )
}
