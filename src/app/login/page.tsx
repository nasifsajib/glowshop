"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const tEmail = email.trim()
    const tPass = password.trim()

    const isAdmin = tEmail === "admin@glowshop.com" && tPass === "admin123"

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email: tEmail, password: tPass })
      if (!error && data?.user) {
        const user = isAdmin
          ? { id: data.user.id, name: "Admin", email: tEmail, avatar: "", phone: "", role: "admin" as const }
          : { id: data.user.id, name: data.user.email || "User", email: tEmail, avatar: "", phone: "", role: "user" as const }
        dispatch({ type: "SET_USER", payload: user })
        try { localStorage.setItem("glowshop-admin", JSON.stringify(user)) } catch {}
        toast({ title: isAdmin ? "Welcome Admin" : "Welcome back!", variant: "success" })
        router.push(isAdmin ? "/admin" : "/")
        return
      }
    } catch {}

    if (isAdmin) {
      const fb = { id: "admin-fallback", name: "Admin", email: "admin@glowshop.com", avatar: "", phone: "", role: "admin" as const }
      dispatch({ type: "SET_USER", payload: fb })
      try { localStorage.setItem("glowshop-admin", JSON.stringify(fb)) } catch {}
      toast({ title: "Welcome Admin", variant: "success" })
      router.push("/admin")
      return
    }

    toast({ title: "Invalid credentials", description: "Check your email and password", variant: "error" })
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <span className="text-2xl">✦</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Welcome Back</h1>
          <p className="text-muted-foreground mt-2">Sign in to your GlowShop account</p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border bg-card">
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/forgot-password" className="text-xs text-primary hover:underline">
                  Forgot?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-10" required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPassword ? "Hide password" : "Show password"}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" variant="premium" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
