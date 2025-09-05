/**
 * FeaturedProducts - Grid of products highlighted on the home page.
 */

import { featuredProducts, type Product } from '../../data/catalog'
import ProductCard from '../common/ProductCard'

/**
 * Handles add-to-cart event (placeholder).
 */
function useCart() {
  /** Simulated add-to-cart; replace with store integration if available. */
  const add = (p: Product) => {
    // In production, integrate with cart store and toast notifications.
    console.log('Added to cart:', p.id)
  }
  return { add }
}

export default function FeaturedProducts() {
  const cart = useCart()
  return (
    <section id="featured" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Featured Gear</h2>
          <p className="text-sm text-neutral-700">Our top picks, field-tested and ready to ship.</p>
        </div>
        <a href="#categories" className="text-sm font-medium text-neutral-900 hover:underline">
          Explore all categories
        </a>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={cart.add} />
        ))}
      </div>
    </section>
  )
}
