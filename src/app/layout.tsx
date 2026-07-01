import type { Metadata } from "next"
import { Poppins, Playfair_Display } from "next/font/google"
import "./globals.css"
import { AppProvider } from "@/lib/store"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav"
import { BackToTop } from "@/components/ui/back-to-top"
import { WhatsAppChat } from "@/components/ui/whatsapp-chat"
import { Toaster } from "@/components/ui/toaster"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "GlowShop - Premium Skincare & Beauty Products",
  description:
    "Discover premium skincare, makeup, and beauty products at GlowShop. Curated for your glow. Free shipping on orders over $50.",
  keywords: "skincare, beauty, makeup, k-beauty, korean skincare, moisturizer, serum",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AppProvider>
          <Header />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileBottomNav />
          <BackToTop />
          <WhatsAppChat />
          <Toaster />
        </AppProvider>
      </body>
    </html>
  )
}
