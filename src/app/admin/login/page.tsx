"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Lock, Mail, Shield } from "lucide-react"
import { useApp } from "@/lib/store"

export default function AdminLoginPage() {
  const router = useRouter()
  const { dispatch } = useApp()
  const [email, setEmail] = useState("admin@glowshop.com")
  const [password, setPassword] = useState("admin123")
  const [msg, setMsg] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setMsg("checking...")

    if (email.trim() === "admin@glowshop.com" && password.trim() === "admin123") {
      dispatch({ type: "SET_USER", payload: { id: "admin-fallback", name: "Admin", email: "admin@glowshop.com", avatar: "", phone: "", role: "admin" } })
      try { localStorage.setItem("glowshop-admin", JSON.stringify({ id: "admin-fallback", name: "Admin", email: "admin@glowshop.com", avatar: "", phone: "", role: "admin" })) } catch {}
      router.push("/admin")
    } else {
      setMsg("wrong creds")
    }
  }

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
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9" />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-9" />
            </div>
          </div>
          <button type="submit" className="w-full h-12 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium shadow-lg shadow-primary/20 hover:bg-primary/90">
            Sign In
          </button>
          <div className="text-center">
            <Link href="/" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              &larr; Back to store
            </Link>
          </div>
          {msg && <p className="text-xs text-center text-muted-foreground">{msg}</p>}
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Demo: admin@glowshop.com / admin123
        </p>
      </div>
    </div>
  )
}
