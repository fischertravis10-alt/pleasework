/**
 * Catalog data for the Denver-based outdoor e-commerce site.
 * Exposes product and category data used across the Home page and product grids.
 */

export interface Category {
  /** Unique slug identifier */
  id: string
  /** Display name */
  name: string
  /** Image URL (smart placeholder) */
  image: string
}

export interface Product {
  /** Unique id/slug */
  id: string
  /** Display name */
  name: string
  /** Price in USD (sale/current price) */
  price: number
  /** Optional "compare at" price (original price) for sale/discount anchoring */
  compareAtPrice?: number
  /** Rating out of 5 */
  rating: number
  /** Thumbnail image URL */
  image: string
  /** Optional UI badge (e.g., "Best Seller", "New") */
  badge?: 'Best Seller' | 'New' | 'Limited'
  /** Category id reference */
  categoryId: string
  /** Optional short product description for quick view */
  description?: string
  /** Optional stock count for scarcity messaging */
  stock?: number
}

/**
 * Category list shown on the home page. Uses smart placeholders to keep images realistic.
 */
export const categories: Category[] = [
  { id: 'headlamps', name: 'Headlamps', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/30dcc8df-f58b-442a-990c-45c72533d70a.jpg' },
  { id: 'water-bottles', name: 'Water Bottles', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/d180bc52-8932-4546-b3cd-7f6e4c2f90b1.jpg' },
  { id: 'cookware', name: 'Camping Cookware', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/e8dbcacb-ce29-48d3-8ec3-1afdcd05f702.jpg' },
  { id: 'knives', name: 'Knives', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/3edf3a1b-7e24-416d-9204-9e4c0a7817b5.jpg' },
  { id: 'multi-tools', name: 'Multi-Tools', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/9ee36fc7-3601-4cda-8ad2-1e4a51f860d1.jpg' },
  { id: 'base-layers', name: 'Base Layers', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/6771b8b8-70ae-4529-9398-4827e1ef5869.jpg' },
  { id: 'hiking-socks', name: 'Hiking Socks', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/aedc877b-d3f4-43de-a1ee-136b3cb387e4.jpg' },
  { id: 'gloves', name: 'Gloves', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/5ebef956-0c3b-4f4d-9009-ce0a75ec7582.jpg' },
  { id: 'hats', name: 'Hats', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/697b844e-a15b-4985-8065-b932b3ab2a10.jpg' },
]

/**
 * Editor's pick / featured products.
 * Note: pricing and images are illustrative placeholders.
 */
export const featuredProducts: Product[] = [
  {
    id: 'hl-peak-200',
    name: 'Peak 200 Headlamp',
    price: 34.99,
    compareAtPrice: 44.99,
    rating: 4.7,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/7249da02-7d81-4046-8891-5f34c220288b.jpg',
    badge: 'Best Seller',
    categoryId: 'headlamps',
    description:
      'Featherlight headlamp with 200 lumens, long-lasting battery, and weatherproof housing—perfect for alpine starts.',
    stock: 7,
  },
  {
    id: 'wb-titan-1l',
    name: 'Titan 1L Bottle',
    price: 24.00,
    compareAtPrice: 32.00,
    rating: 4.6,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/39901b7a-102b-43ad-95a6-488724ef98af.jpg',
    badge: 'New',
    categoryId: 'water-bottles',
    description:
      'Double-wall insulated titanium bottle keeps drinks cold for 24h and hot for 12h. Built to outlast the trail.',
    stock: 23,
  },
  {
    id: 'ck-trailset',
    name: 'Trailset Cookware Duo',
    price: 54.95,
    compareAtPrice: 69.95,
    rating: 4.5,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/22fff4c7-0477-4f26-8a1f-06a58110034b.jpg',
    categoryId: 'cookware',
    description:
      'Ultralight anodized aluminum pot and pan set with heat-diffusing base and nested design to save pack space.',
    stock: 5,
  },
  {
    id: 'kn-edge-pro',
    name: 'Edge Pro Folding Knife',
    price: 69.00,
    compareAtPrice: 89.00,
    rating: 4.8,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/4ec0194e-0599-4e92-b7a1-6107fa7a44bf.jpg',
    badge: 'Limited',
    categoryId: 'knives',
    description:
      'Premium steel blade with secure lock and ergonomic grip—precision cutting in a compact, trail-ready form.',
    stock: 3,
  },
  {
    id: 'mt-compact',
    name: 'Compact Multi-Tool',
    price: 44.00,
    compareAtPrice: 59.00,
    rating: 4.6,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/85081df3-56e9-45a9-853f-5382e8715d7c.jpg',
    categoryId: 'multi-tools',
    description:
      '14 essential functions packed into a pocket-sized body—pliers, blade, drivers, and more with smooth pivots.',
    stock: 15,
  },
  {
    id: 'bl-thermal-crew',
    name: 'Thermal Crew Base Layer',
    price: 59.00,
    compareAtPrice: 79.00,
    rating: 4.4,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/5adfc9b0-98ef-476b-a850-1ccc2c70b45a.jpg',
    categoryId: 'base-layers',
    description:
      'Moisture-wicking, fast-drying thermal crew that traps warmth and breathes during high-output ascents.',
    stock: 11,
  },
]
