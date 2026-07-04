"use client"

import Link from "next/link"
import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/lib/supabase"
import { useApp } from "@/lib/store"
import { fetchUserProfile } from "@/lib/api"
import { toast } from "@/hooks/use-toast"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { dispatch } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const redirectTo = searchParams.get("redirect") || "/account"

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password.trim(),
      })

      if (error || !data?.user) {
        toast({ title: "Invalid credentials", description: "Check your email and password", variant: "error" })
        setLoading(false)
        return
      }

      // Fetch profile to determine role
      const profile = await fetchUserProfile(data.user.id)
      const isAdmin = profile?.role === "admin"

      const user = isAdmin
        ? { id: data.user.id, name: "Admin", email: email.trim(), avatar: "", phone: "", role: "admin" as const }
        : { id: data.user.id, name: data.user.email || "User", email: email.trim(), avatar: "", phone: "", role: "user" as const }

      dispatch({ type: "SET_USER", payload: user })
      try { localStorage.setItem("glowshop-admin", JSON.stringify(user)) } catch {}

      toast({ title: isAdmin ? "Welcome Admin" : "Welcome back!", variant: "success" })
      router.push(isAdmin ? "/admin" : redirectTo)
    } catch {
      toast({ title: "Something went wrong", description: "Please try again", variant: "error" })
      setLoading(false)
    }
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
              <Link href={redirectTo !== "/account" ? `/register?redirect=${encodeURIComponent(redirectTo)}` : "/register"} className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center"><div className="animate-pulse space-y-4"><div className="h-8 bg-muted rounded w-48 mx-auto" /><div className="h-4 bg-muted rounded w-64 mx-auto" /></div></div>}>
      <LoginForm />
    </Suspense>
  )
}
