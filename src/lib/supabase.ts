import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const noop = () => Promise.resolve({ data: null, error: new Error("Supabase not configured") })

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: { signInWithPassword: noop, signOut: noop },
      from: () => ({ select: () => Promise.resolve({ data: null, error: new Error("Supabase not configured") }) }),
    } as any
