"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Phone, User, Package, CreditCard, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useApp } from "@/lib/store"
import { supabase } from "@/lib/supabase"
import { saveOrder } from "@/lib/api"
import { toast } from "@/hooks/use-toast"
import { formatPrice, generateId } from "@/lib/utils"

export default function CheckoutPage() {
  const router = useRouter()
  const { state, dispatch } = useApp()

  const [fullName, setFullName] = useState(state.user?.name || "")
  const [phone, setPhone] = useState(state.user?.phone || "")
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state_, setState] = useState("")
  const [zip, setZip] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(() => {
    if (!state.user) {
      router.replace("/login?redirect=/checkout")
    } else {
      setCheckingAuth(false)
    }
  }, [state.user, router])

  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 50 ? 0 : 5.99
  const total = subtotal + shipping

  if (checkingAuth) {
    return <div className="container mx-auto px-4 py-20 text-center"><div className="animate-pulse space-y-4"><div className="h-8 bg-muted rounded w-48 mx-auto" /><div className="h-4 bg-muted rounded w-64 mx-auto" /></div></div>
  }

  if (state.cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
        <h1 className="text-2xl font-bold mb-2">Nothing to Checkout</h1>
        <p className="text-muted-foreground mb-6">Your cart is empty.</p>
        <Button asChild variant="premium"><Link href="/products">Shop Now</Link></Button>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !phone.trim() || !street.trim() || !city.trim() || !state_.trim() || !zip.trim()) {
      toast({ title: "Missing fields", description: "Please fill in all required fields.", variant: "error" })
      return
    }

    setSubmitting(true)

    const order = {
      id: `ORD-${generateId().toUpperCase()}`,
      items: [...state.cart],
      total,
      status: "pending" as const,
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      address: {
        id: generateId(),
        fullName: fullName.trim(),
        street: street.trim(),
        city: city.trim(),
        state: state_.trim(),
        zip: zip.trim(),
        phone: phone.trim(),
        isDefault: false,
      },
    }

    dispatch({ type: "ADD_ORDER", payload: order })
    dispatch({ type: "CLEAR_CART" })

    // Save to Supabase for cross-device sync
    try {
      await saveOrder({
        id: order.id,
        user_id: state.user?.id || "",
        user_name: state.user?.name || fullName.trim(),
        user_email: state.user?.email || "",
        items: order.items,
        total: order.total,
        status: "pending",
        date: order.date,
        address: order.address,
      })
    } catch (err) {
      console.error("Failed to sync order to Supabase:", err)
    }

    toast({
      title: "Order placed!",
      description: `Your order ${order.id} has been placed successfully. You'll pay on delivery.`,
      variant: "success",
    })

    setSubmitting(false)
    router.push("/account?tab=orders")
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href="/cart"><ArrowLeft className="h-5 w-5" /></Link>
        </Button>
        <h1 className="text-2xl sm:text-3xl font-bold font-heading">Checkout</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Shipping Details */}
          <div className="lg:col-span-3 space-y-6">
            <div className="p-6 rounded-2xl border bg-card">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Shipping Address
              </h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="fullName" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" className="pl-9" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" className="pl-9" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="street">Street Address</Label>
                  <Input id="street" value={street} onChange={e => setStreet(e.target.value)} placeholder="123 Beauty Lane, Apt 4B" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={city} onChange={e => setCity(e.target.value)} placeholder="New York" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={state_} onChange={e => setState(e.target.value)} placeholder="NY" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input id="zip" value={zip} onChange={e => setZip(e.target.value)} placeholder="10001" required />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="p-6 rounded-2xl border bg-card">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" /> Payment Method
              </h2>

              <div className="p-4 rounded-xl border-2 border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Cash on Delivery</p>
                    <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5" />
                Your payment info is secure. You only pay when your order arrives.
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl border bg-card">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" /> Order Summary
              </h3>

              <div className="space-y-3 mb-4">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden shrink-0">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              <p className="text-xs text-muted-foreground mb-4 text-center">
                Pay <span className="font-semibold">{formatPrice(total)}</span> when your order is delivered.
              </p>

              <Button type="submit" className="w-full h-12" variant="premium" disabled={submitting}>
                {submitting ? "Placing Order..." : `Place Order — ${formatPrice(total)}`}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
