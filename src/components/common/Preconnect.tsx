/**
 * Preconnect.tsx
 * Adds <link rel="preconnect"> and <link rel="dns-prefetch"> to critical origins.
 * - Focuses on the image CDN used by hero and catalog placeholders.
 * - Injects into document.head idempotently and cleans up on unmount.
 */

import { useEffect } from 'react'

/** Upsert a head <link> with rel + href (+attrs) keyed by rel+href. */
function upsertLink(rel: string, href: string, attrs: Record<string, string> = {}) {
  const selector = `link[rel="${rel}"][href="${href}"]`
  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    el.setAttribute('href', href)
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
}

/**
 * Preconnect - Mounts resource hints for faster image fetches.
 */
export default function Preconnect() {
  useEffect(() => {
    const origins = ['https://pub-cdn.sider.ai']

    // dns-prefetch + preconnect (with CORS) for each origin
    origins.forEach((o) => {
      upsertLink('dns-prefetch', o)
      upsertLink('preconnect', o, { crossOrigin: 'anonymous' })
    })

    // No cleanup: keep hints across route changes in SPA
  }, [])

  return null
}
