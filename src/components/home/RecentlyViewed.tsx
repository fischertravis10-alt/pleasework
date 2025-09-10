/** 
 * RecentlyViewed.tsx
 * Personalized rail. Falls back to featured products when no history is present.
 * - Enhancement: use the persisted recent store directly (Zustand) instead of raw localStorage parsing.
 */

import type { Product } from '../../data/catalog'
import { featuredProducts } from '../../data/catalog'
import ProductCard from '../common/ProductCard'
import { useCartStore } from '../../stores/cart'
import { toast } from 'sonner'
import { useRecentStore } from '../../stores/recent'
import { announce } from '../../utils/announce'

/** RecentlyViewed - Shows personalized items or helpful best sellers. */
export default function RecentlyViewed() {
  const add = useCartStore((s) => s.add)
  const recentItems = useRecentStore((s) => s.items)

  const items: Product[] =
    Array.isArray(recentItems) && recentItems.length > 0 ? recentItems.slice(0, 8) : featuredProducts.slice(0, 4)

  function handleAdd(p: Product) {
    add(p, 1)
    toast.success('Added to cart', { description: p.name })
    announce(`Added ${p.name} to cart`)
  }

  return (
    <section aria-label="Recently viewed">
      <div className="mb-3 flex items-end justify-between">
        <h2 className="text-xl font-bold text-neutral-900">
          {recentItems.length > 0 ? 'Recently viewed' : 'Continue browsing'}
        </h2>
        <a href="#featured" className="text-sm font-semibold text-[#2F5D3A] hover:underline">
          View best sellers
        </a>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={handleAdd} onView={() => {}} />
        ))}
      </div>
    </section>
  )
}
