/**
 * StructuredDataExtras.tsx
 * Supplemental JSON-LD blocks:
 * - WebSite + SearchAction (sitelinks search box).
 * - WebPage (homepage context).
 * - BreadcrumbList (home).
 * - SiteNavigationElement (primary in-page anchors).
 * - ItemList (featured products names for context).
 */

import React from 'react'
import { featuredProducts } from '../../data/catalog'

/**
 * StructuredDataExtras
 * Renders additional JSON-LD for the site.
 */
export default function StructuredDataExtras() {
  const siteUrl = 'https://highcountrygear.shop'
  const description =
    'Shop trail‑tested headlamps, bottles, cookware, knives, multi‑tools, and apparel curated in Denver. Free shipping over $39, bundle savings, and 30‑day returns.'

  // WebSite + SearchAction schema
  const searchAction = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'High Country Gear',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/#/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  // WebPage (homepage)
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'High Country Gear Home',
    url: siteUrl,
    description,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      url: siteUrl,
      name: 'High Country Gear',
    },
  }

  // Breadcrumbs (Home)
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
    ],
  }

  // ItemList of featured products to describe the curated grid on the homepage
  const itemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Featured products',
    itemListElement: featuredProducts.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.name,
      url: `${siteUrl}/#featured`,
    })),
  }

  // SiteNavigationElement for main anchors (crawlers can understand nav)
  const nav = {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: [
      'Shop by category',
      'Best sellers',
      'Bundle & Save',
      'Why shop with us',
      'Support',
      'Newsletter',
    ],
    url: [
      `${siteUrl}/#categories`,
      `${siteUrl}/#featured`,
      `${siteUrl}/#bundle`,
      `${siteUrl}/#features`,
      `${siteUrl}/#support`,
      `${siteUrl}/#newsletter`,
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(searchAction) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nav) }}
      />
    </>
  )
}
