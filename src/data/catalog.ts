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
  /** Price in USD */
  price: number
  /** Rating out of 5 */
  rating: number
  /** Thumbnail image URL */
  image: string
  /** Optional UI badge (e.g., "Best Seller", "New") */
  badge?: 'Best Seller' | 'New' | 'Limited'
  /** Category id reference */
  categoryId: string
}

/**
 * Category list shown on the home page. Uses smart placeholders to keep images realistic.
 */
export const categories: Category[] = [
  { id: 'headlamps', name: 'Headlamps', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/662fee89-3967-45c7-aeaf-e0b955c2c566.jpg' },
  { id: 'water-bottles', name: 'Water Bottles', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/35a05979-95f1-4d16-a8b0-873aafa0ba97.jpg' },
  { id: 'cookware', name: 'Camping Cookware', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/bf8c02b9-4c96-4f27-8096-d537afeb202d.jpg' },
  { id: 'knives', name: 'Knives', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/4ea18417-8c83-4ae0-a021-a962c36ae735.jpg' },
  { id: 'multi-tools', name: 'Multi-Tools', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/0236d623-97a7-4165-a35e-4e2073f364e8.jpg' },
  { id: 'base-layers', name: 'Base Layers', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/84b170b7-7e2b-483e-b4c8-fd91dcdf82bc.jpg' },
  { id: 'hiking-socks', name: 'Hiking Socks', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/44f9278d-0e78-4e3c-a3f1-fb4c7acc0131.jpg' },
  { id: 'gloves', name: 'Gloves', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/188061ef-7efa-4fd2-a7ef-d9df46d69aed.jpg' },
  { id: 'hats', name: 'Hats', image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/d4c63554-8fd8-4d4a-8613-7212ec9b13bd.jpg' },
]

/**
 * Editor's pick / featured products.
 * Note: pricing and images are illustrative placeholders.
 */
export const featuredProducts: Product[] = [
  {
    id: 'hl-peak-200',
    name: 'Peak 200 Headlamp',
    price: 39.99,
    rating: 4.7,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/2ee301ca-fe0b-45a4-9602-2cc2b07de27a.jpg',
    badge: 'Best Seller',
    categoryId: 'headlamps',
  },
  {
    id: 'wb-titan-1l',
    name: 'Titan 1L Bottle',
    price: 29.0,
    rating: 4.6,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/27867837-a84b-4c82-91e7-85c974bd1d97.jpg',
    badge: 'New',
    categoryId: 'water-bottles',
  },
  {
    id: 'ck-trailset',
    name: 'Trailset Cookware Duo',
    price: 59.95,
    rating: 4.5,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/4cfdc7b0-4ad7-4644-b524-12eb859462a7.jpg',
    categoryId: 'cookware',
  },
  {
    id: 'kn-edge-pro',
    name: 'Edge Pro Folding Knife',
    price: 79.0,
    rating: 4.8,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/7c0bfb9a-dc95-4791-9301-3d1281d998c3.jpg',
    badge: 'Limited',
    categoryId: 'knives',
  },
  {
    id: 'mt-compact',
    name: 'Compact Multi-Tool',
    price: 49.0,
    rating: 4.6,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/44526f25-0c8d-4606-95c8-afa8735306e4.jpg',
    categoryId: 'multi-tools',
  },
  {
    id: 'bl-thermal-crew',
    name: 'Thermal Crew Base Layer',
    price: 64.0,
    rating: 4.4,
    image: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/3430286e-23cf-444b-939f-cbdd54d78690.jpg',
    categoryId: 'base-layers',
  },
]
