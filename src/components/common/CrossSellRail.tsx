/** 
 * CrossSellRail.tsx
 * Compact recommendations rail shown in the cart drawer to increase AOV.
 * - Pulls from featuredProducts and excludes items already in the cart.
 * - excludeIds is optional; defaults to an empty array for safety.
 * - Uses small thumbs, clear name/price, and quick add buttons.
 */

import { ShoppingCart } from 'lucide-react'
import { featuredProducts } from '../../data/catalog'
import { useCartStore } from '../../stores/cart'
import { formatMoney } from '../../utils/format'
import { toast } from 'sonner'

/** Props for the cross-sell rail. */
interface CrossSellRailProps {
  /** Exclude product ids already in the cart */
  excludeIds?: string[]
  /** Optional title override */
  title?: string
  /** Max items to display */
  limit?: number
}

/** 
 * CrossSellRail - small card list of recommended products with quick add.
 * Defensive against undefined props, uses Set for O(1) lookups.
 */
export default function CrossSellRail({
  excludeIds = [],
  title = 'You may also like',
  limit = 3,
}: CrossSellRailProps) {
  const add = useCartStore((s) => s.add)

  // Defensive set in case excludeIds is undefined/null
  const excluded = new Set(excludeIds ?? [])

  // Filter featured products by excluded ids
  const picks = featuredProducts.filter((p) => !excluded.has(p.id)).slice(0, Math.max(0, limit))

  if (picks.length === 0) return null

  /** Add single product with feedback. */
  function handleAdd(id: string) {
    const product = featuredProducts.find((p) => p.id === id)
    if (!product) return
    add(product, 1)
    toast.success('Added to cart', { description: product.name })
  }

  return (
    <section aria-label="Recommended products" className="mt-4">
      <h3 className="text-sm font-semibold text-neutral-900">{title}</h3>
      <ul className="mt-2 grid grid-cols-1 gap-3">
        {picks.map((p) => (
          <li key={p.id} className="flex items-center gap-3 rounded-lg border border-neutral-200 p-3 dark:border-neutral-800">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-neutral-200 bg-neutral-50 dark:border-neutral-800">
              <img
                src={p.image}
                alt={p.name}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover"
                width={160}
                height={160}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">{p.name}</p>
              <p className="text-sm text-[#2F5D3A]">{formatMoney(p.price)}</p>
            </div>
            <button
              onClick={() => handleAdd(p.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D3A] px-3 py-2 text-xs font-semibold text-white hover:bg-[#254D30]"
              aria-label={`Add ${p.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
