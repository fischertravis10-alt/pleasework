/** 
 * FeaturedProducts.tsx
 * Curated best sellers grid driving exploration and add-to-cart.
 * - Safely maps over featured products with defensive fallbacks.
 * - Integrates ProductCard and cart store for quick adds.
 * - CTA links to the Bundle Builder anchor.
 * - Enhancement: Quick View modal + Recently Viewed persistence.
 */

import { useState } from 'react'
import { featuredProducts as catalogFeatured } from '../../data/catalog'
import ProductCard from '../common/ProductCard'
import { useCartStore } from '../../stores/cart'
import { toast } from 'sonner'
import type { Product } from '../../data/catalog'
import ProductQuickView from '../common/ProductQuickView'
import { useRecentStore } from '../../stores/recent'
import { announce } from '../../utils/announce'
import { track } from '../../utils/analytics'

/** Adds a product to the cart with feedback. */
function useAddToCart() {
  const add = useCartStore((s) => s.add)
  return (product: Product) => {
    add(product, 1)
    toast.success('Added to cart', { description: product.name })
    announce(`Added ${product.name} to cart`)
    try {
      track('add_to_cart', { id: product.id, name: product.name, price: product.price })
    } catch {}
  }
}

/** FeaturedProducts - Best sellers grid with safe rendering and quick view. */
export default function FeaturedProducts() {
  // Defensive fallback to avoid undefined.map
  const products = Array.isArray(catalogFeatured) ? catalogFeatured : []
  const handleAdd = useAddToCart()

  // Quick view state
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<Product | null>(null)

  // Recently viewed (persisted)
  const addRecent = useRecentStore((s) => s.add)

  if (products.length === 0) {
    return (
      <section aria-label="Featured products">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 text-center">
          <p className="text-sm text-neutral-700">No featured products yet. Check back soon.</p>
        </div>
      </section>
    )
  }

  /** Handle viewing a product: open quick view and persist to recent. */
  function handleView(p: Product) {
    setActive(p)
    setOpen(true)
    addRecent(p)
    try {
      track('view_product', { id: p.id, name: p.name, price: p.price })
    } catch {}
  }

  return (
    <section aria-label="Featured products">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold text-neutral-900">Best sellers</h2>
        <a href="#bundle" className="text-sm font-semibold text-[#2F5D3A] hover:underline">
          Build a bundle & save 10–15%
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={handleAdd}
            onView={() => handleView(p)}
          />
        ))}
      </div>

      {/* Quick view modal (uses existing component) */}
      <ProductQuickView open={open} onOpenChange={setOpen} product={active} />
    </section>
  )
}
