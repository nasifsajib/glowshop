"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Mail, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ForgotPasswordPage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:py-20">
      <div className="max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <span className="text-2xl">🔑</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading">Forgot Password?</h1>
          <p className="text-muted-foreground mt-2">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 sm:p-8 rounded-2xl border bg-card"
        >
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="you@example.com" className="pl-9" required />
              </div>
            </div>
            <Button type="submit" className="w-full h-12" variant="premium">
              <Send className="h-4 w-4" /> Send Reset Link
            </Button>
          </form>

          <div className="text-center mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3 w-3" /> Back to Sign In
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
