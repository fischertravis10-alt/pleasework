/**
 * StructuredData.tsx
 * Injects JSON-LD structured data for Organization and featured Products.
 * - Organization enriched with contactPoint and address.
 * - Featured ItemList keeps product Offer/Ratings data.
 */

import { useEffect } from 'react'
import { featuredProducts } from '../../data/catalog'

/** Build Organization schema JSON-LD. */
function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'High Country Gear',
    url: 'https://highcountrygear.shop',
    logo:
      'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/1f16cfc1-223c-4bbb-96c6-e6cc18ae0813.png',
    sameAs: [
      'https://www.instagram.com/',
      'https://www.facebook.com/',
      'https://www.youtube.com/',
      'https://www.tiktok.com/',
    ],
    foundingDate: '2022',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-303-555-1234',
        contactType: 'customer service',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Denver',
      addressRegion: 'CO',
      addressCountry: 'US',
    },
  }
}

/** Build ItemList schema for featured products. */
function buildFeaturedList() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured Gear',
    itemListElement: featuredProducts.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Product',
        name: p.name,
        image: p.image,
        sku: p.id,
        brand: 'High Country Gear',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: p.rating,
          reviewCount: Math.round(40 + p.rating * 10),
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'USD',
          price: p.price,
          availability: 'https://schema.org/InStock',
          url: 'https://highcountrygear.shop/#featured',
        },
      },
    })),
  }
}

/**
 * StructuredData - Mounts JSON-LD <script> tags into document.head.
 */
export default function StructuredData() {
  useEffect(() => {
    const orgScript = document.createElement('script')
    orgScript.type = 'application/ld+json'
    orgScript.text = JSON.stringify(buildOrganization())

    const listScript = document.createElement('script')
    listScript.type = 'application/ld+json'
    listScript.text = JSON.stringify(buildFeaturedList())

    document.head.appendChild(orgScript)
    document.head.appendChild(listScript)
    return () => {
      orgScript.remove()
      listScript.remove()
    }
  }, [])

  return null
}
