"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { motion } from "framer-motion"
import { useApp } from "@/lib/store"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { state, dispatch } = useApp()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="relative" aria-label="Toggle theme">
        <div className="h-[1.2rem] w-[1.2rem]" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => dispatch({ type: "TOGGLE_DARK_MODE" })}
      aria-label={state.isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className="relative"
    >
      <motion.div
        initial={false}
        animate={{ rotate: state.isDarkMode ? 180 : 0, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {state.isDarkMode ? (
          <Moon className="h-[1.2rem] w-[1.2rem]" />
        ) : (
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        )}
      </motion.div>
    </Button>
  )
}
