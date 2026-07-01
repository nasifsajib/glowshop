import Link from "next/link"
import { Heart, Mail, MapPin, Phone, Globe, MessageCircle, Video, Camera } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Skincare", href: "/products?category=Skincare" },
      { label: "Makeup", href: "/products?category=Makeup" },
      { label: "Hair Care", href: "/products?category=Hair+Care" },
      { label: "Body Care", href: "/products?category=Body+Care" },
      { label: "Sunscreen", href: "/products?category=Sunscreen" },
      { label: "Korean Beauty", href: "/products?category=Korean+Beauty" },
    ],
  },
  about: {
    title: "About",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
      { label: "Blog", href: "#" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { label: "Contact Us", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Shipping & Returns", href: "#" },
      { label: "Track Order", href: "#" },
      { label: "Size Guide", href: "#" },
    ],
  },
}

const socials = [
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Facebook" },
  { icon: Globe, href: "#", label: "Twitter" },
  { icon: Video, href: "#", label: "YouTube" },
]

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      {/* Newsletter */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Join the Glow Community</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe for exclusive deals, beauty tips, and new arrivals.
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-12"
              aria-label="Email for newsletter"
            />
            <Button className="h-12 px-6 shrink-0" variant="premium">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <Separator />

      {/* Links */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-gradient-to-r from-[#d4839a] to-[#e8a0b5] bg-clip-text text-transparent">
                ✦
              </span>
              <span className="text-xl font-bold tracking-tight">
                Glow<span className="text-primary">Shop</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Your premium destination for clean, effective skincare and beauty products.
              Curated for your glow.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Beauty Lane, New York, NY 10001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-GLOW</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>hello@glowshop.com</span>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} GlowShop. All rights reserved.
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
