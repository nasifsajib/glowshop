"use client"

import { useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Lock, Mail, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

export default function AdminLoginPage() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleLogin = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setLoading(true)

    const trimmedEmail = email.trim()
    const trimmedPass = password.trim()

    if (trimmedEmail === "admin@glowshop.com" && trimmedPass === "admin123") {
      const fallbackUser = {
        id: "admin-fallback",
        name: "Admin",
        email: "admin@glowshop.com",
        avatar: "",
        phone: "",
        role: "admin" as const,
      }
      dispatch({ type: "SET_USER", payload: fallbackUser })
      try { localStorage.setItem("glowshop-admin", JSON.stringify(fallbackUser)) } catch {}
      toast({ title: "Welcome Admin", variant: "success" })
      router.push("/admin")
    } else {
      toast({ title: "Invalid credentials", description: "Use admin@glowshop.com / admin123", variant: "error" })
      setLoading(false)
    }
  }, [email, password, dispatch, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent shadow-lg mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to manage GlowShop</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 rounded-2xl border bg-card space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@glowshop.com" className="pl-9" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" type={show ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="pl-9 pr-10" required />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full h-12" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <div className="text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              &larr; Back to store
            </Link>
          </div>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Demo: admin@glowshop.com / admin123
        </p>
      </div>
    </div>
  )
}
