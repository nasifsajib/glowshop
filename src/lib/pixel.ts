declare global {
  interface Window {
    fbq: any
  }
}

export function fbEvent(event: string, data?: Record<string, any>) {
  try {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", event, data)
    }
  } catch {}
}
