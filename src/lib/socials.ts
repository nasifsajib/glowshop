import { supabase } from "./supabase"

export interface SocialLinks {
  whatsapp: string
  facebook: string
  instagram: string
  tiktok: string
}

const STORAGE_KEY = "glowshop-socials"

export const defaultSocials: SocialLinks = {
  whatsapp: "https://wa.me/1234567890",
  facebook: "#",
  instagram: "#",
  tiktok: "#",
}

export function getSocialLinks(): SocialLinks {
  if (typeof window === "undefined") return defaultSocials
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return { ...defaultSocials, ...JSON.parse(saved) }
  } catch {}
  return defaultSocials
}

export function saveSocialLinks(links: SocialLinks): void {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(links)) } catch {}
}

export async function fetchSocialLinksFromDB(): Promise<SocialLinks | null> {
  try {
    const { data, error } = await supabase.from("social_links").select("*").limit(1).single()
    if (error || !data) return null
    return {
      whatsapp: data.whatsapp || defaultSocials.whatsapp,
      facebook: data.facebook || defaultSocials.facebook,
      instagram: data.instagram || defaultSocials.instagram,
      tiktok: data.tiktok || defaultSocials.tiktok,
    }
  } catch { return null }
}

export async function saveSocialLinksToDB(links: SocialLinks): Promise<void> {
  const { error } = await supabase.from("social_links").upsert(
    { id: 1, ...links, updated_at: new Date().toISOString() },
    { onConflict: "id" }
  )
  if (error) throw error
}
