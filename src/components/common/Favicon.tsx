/**
 * Favicon.tsx
 * Small head manager that injects the site logo as the favicon and Apple touch icon.
 * This avoids touching index.html and works across routes.
 */

import { useEffect } from 'react'

/**
 * Favicon - Inserts or updates favicon link tags at runtime.
 */
export default function Favicon() {
  // Reuse the provided logo image
  const faviconUrl =
    'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/1f16cfc1-223c-4bbb-96c6-e6cc18ae0813.png'

  /**
   * Ensure a single <link rel="icon"> and <link rel="apple-touch-icon"> exist and point to the logo.
   */
  useEffect(() => {
    const ensureLink = (rel: string, sizes?: string) => {
      let link = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]${sizes ? `[sizes="${sizes}"]` : ''}`)
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        if (sizes) link.sizes = sizes
        document.head.appendChild(link)
      }
      link.href = faviconUrl
      link.type = 'image/png'
    }

    // Standard favicon (browsers will scale as needed)
    ensureLink('icon')
    // Common sizes hints
    ensureLink('icon', '32x32')
    ensureLink('icon', '16x16')
    // iOS home screen
    ensureLink('apple-touch-icon')

    // Cleanup not required; links can remain in <head> across SPA navigation.
  }, [])

  return null
}
