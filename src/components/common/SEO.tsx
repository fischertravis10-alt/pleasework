/** 
 * SEO.tsx
 * Comprehensive head manager for SPA SEO:
 * - Sets title, description, canonical, robots, theme-color.
 * - OpenGraph + Twitter Card, with locale, alt text, updated_time.
 * - Hreflang alternates (en + x-default) and language attribute.
 * - Preloads hero image (LCP) and upserts safely/idempotently.
 */

import { useEffect } from 'react'

/** Safely upsert a <meta name="..."> tag. */
function upsertMetaByName(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Safely upsert an OG <meta property="og:*"> tag. */
function upsertMetaByProperty(property: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Upsert a <link rel="..."> tag (single key by rel). */
function upsertLink(rel: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v))
}

/** Upsert or create a specific hreflang alternate link. */
function upsertHreflang(hreflang: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="alternate"][hreflang="${hreflang}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * SEO - Applies comprehensive SEO/meta tags app-wide.
 */
export default function SEO() {
  useEffect(() => {
    // Canonical site URL (avoid duplicating hash routes)
    const siteUrl = 'https://highcountrygear.shop'
    // LCP/social image
    const heroImage =
      'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/8b901e9d-d9ec-47c0-8bd3-54d9e71dcf5e.jpg'
    const heroAlt = 'Sunrise over a high alpine trail'
    const title = 'High Country Gear • Trail‑tested outdoor gear from Denver'
    const description =
      'Shop trail‑tested headlamps, bottles, cookware, knives, multi‑tools, and apparel curated in Denver. Free shipping over $39, bundle savings, and 30‑day returns.'
    const locale = 'en_US'
    const nowISO = new Date().toISOString()

    // Document title + meta description
    document.title = title
    upsertMetaByName('description', description)

    // Canonical + hreflang
    upsertLink('canonical', { href: siteUrl })
    upsertHreflang('en', siteUrl)
    upsertHreflang('x-default', siteUrl)

    // Robots + Theme color
    upsertMetaByName('robots', 'index, follow')
    upsertMetaByName('theme-color', '#1F3D2B')

    // OpenGraph
    upsertMetaByProperty('og:type', 'website')
    upsertMetaByProperty('og:site_name', 'High Country Gear')
    upsertMetaByProperty('og:title', title)
    upsertMetaByProperty('og:description', description)
    upsertMetaByProperty('og:url', siteUrl)
    upsertMetaByProperty('og:image', heroImage)
    upsertMetaByProperty('og:image:alt', heroAlt)
    upsertMetaByProperty('og:image:width', '2400')
    upsertMetaByProperty('og:image:height', '1600')
    upsertMetaByProperty('og:locale', locale)
    upsertMetaByProperty('og:updated_time', nowISO)

    // Twitter Card
    upsertMetaByName('twitter:card', 'summary_large_image')
    upsertMetaByName('twitter:title', title)
    upsertMetaByName('twitter:description', description)
    upsertMetaByName('twitter:image', heroImage)
    // Optional handles (update when verified)
    upsertMetaByName('twitter:site', '@highcountrygear')
    upsertMetaByName('twitter:creator', '@highcountrygear')

    // Preload hero image for faster LCP
    upsertLink('preload', { as: 'image', href: heroImage, fetchpriority: 'high' })

    // Set <html lang="en"> for a11y and SEO
    try {
      document.documentElement.setAttribute('lang', 'en')
    } catch {
      // ignore
    }
  }, [])

  return null
}
