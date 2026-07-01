"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MapPin, Plus, Star, Trash2, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/lib/store"
import { toast } from "@/hooks/use-toast"

export default function AddressesPage() {
  const { state, dispatch } = useApp()

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_ADDRESS", payload: id })
    toast({ title: "Address removed" })
  }

  const handleSetDefault = (id: string) => {
    dispatch({ type: "SET_DEFAULT_ADDRESS", payload: id })
    toast({ title: "Default address updated" })
  }

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="icon">
            <Link href="/profile"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-heading">Address Book</h1>
            <p className="text-sm text-muted-foreground">{state.addresses.length} addresses</p>
          </div>
        </div>
        <Button size="sm"><Plus className="h-4 w-4" /> Add New</Button>
      </div>

      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
        {state.addresses.map((addr, i) => (
          <motion.div
            key={addr.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="relative p-5 rounded-2xl border bg-card"
          >
            {addr.isDefault && (
              <Badge variant="secondary" className="absolute top-3 right-3 text-[10px]">
                <Star className="h-3 w-3 fill-current mr-1" /> Default
              </Badge>
            )}
            <MapPin className="h-5 w-5 text-primary mb-3" />
            <p className="font-semibold">{addr.fullName}</p>
            <p className="text-sm text-muted-foreground mt-1">{addr.street}</p>
            <p className="text-sm text-muted-foreground">
              {addr.city}, {addr.state} {addr.zip}
            </p>
            <p className="text-sm text-muted-foreground">{addr.phone}</p>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t">
              {!addr.isDefault && (
                <Button variant="outline" size="sm" className="text-xs" onClick={() => handleSetDefault(addr.id)}>
                  Set Default
                </Button>
              )}
              <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-600" onClick={() => handleRemove(addr.id)}>
                <Trash2 className="h-3 w-3" /> Remove
              </Button>
            </div>
          </motion.div>
        ))}

        {/* Add new card */}
        <button className="flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 hover:bg-muted/50 transition-all group">
          <Plus className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors mt-2">Add New Address</p>
        </button>
      </div>
    </div>
  )
}
