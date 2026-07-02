"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: "https://glowshop-beige.vercel.app/login",
    })

    if (error) {
      toast({ title: "Error", description: error.message, variant: "error" })
    } else {
      setSent(true)
      toast({ title: "Check your email", description: "Reset link sent if the account exists.", variant: "success" })
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-12 sm:py-20">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Forgot Password?</h1>
          <p className="text-muted-foreground mt-2">
            {sent ? "Check your inbox for the reset link." : "We&apos;ll send you reset instructions."}
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border bg-card">
          <form className="space-y-4" onSubmit={handleReset}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="pl-9" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-12" variant="premium" disabled={loading || sent}>
              <Send className="h-4 w-4" /> {sent ? "Link Sent" : "Send Reset Link"}
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link href="/login" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-3 w-3" /> Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
