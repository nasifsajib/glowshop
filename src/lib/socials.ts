export interface SocialLinks {
  whatsapp: string
  facebook: string
  instagram: string
  twitter: string
  youtube: string
}

const STORAGE_KEY = "glowshop-socials"

export const defaultSocials: SocialLinks = {
  whatsapp: "https://wa.me/1234567890",
  facebook: "#",
  instagram: "#",
  twitter: "#",
  youtube: "#",
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
