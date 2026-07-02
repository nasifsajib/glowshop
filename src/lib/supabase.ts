import { createClient } from "@supabase/supabase-js"

const FALLBACK_URL = "https://lokchhaitjizdgqfujir.supabase.co"
const FALLBACK_KEY = "sb_publishable_YTd9ZOjsscO7w_66Gyo4KA_kEQ_hOjg"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || FALLBACK_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
