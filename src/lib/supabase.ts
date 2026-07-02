import { createClient } from "@supabase/supabase-js"

const FALLBACK_URL = "https://lokchhaitjizdgqfujir.supabase.co"
const FALLBACK_KEY = "sb_publishable_YTd9ZOjsscO7w_66Gyo4KA_kEQ_hOjg"

export const supabase = createClient(FALLBACK_URL, FALLBACK_KEY)
