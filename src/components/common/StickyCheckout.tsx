/**
 * StickyCheckout.tsx
 * Mobile-first fixed bottom bar showing subtotal, items, and a strong checkout CTA.
 * - Emits 'open-cart' event for a consistent way to trigger the cart drawer from anywhere.
 */

import { useMemo, useState } from 'react'
import { useCartStore, FREE_SHIPPING_THRESHOLD } from '../../stores/cart'
import { formatMoney, pluralize } from '../../utils/format'

/** Sticky checkout bar that appears when the cart has items. */
export default function StickyCheckout() {
  const items = useCartStore((s) => s.items)
  const count = useCartStore((s) => s.totalItems())
  const subtotal = useMemo(
    () => Object.values(items).reduce((sum, r) => sum + r.product.price * r.qty, 0),
    [items]
  )

  if (count === 0) return null

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)

  function openCart() {
    // Broadcast an event the header listens to
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.dispatchEvent(new CustomEvent('open-cart' as any))
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-[#E6D8B8] bg-white/95 p-3 shadow-2xl backdrop-blur md:hidden" style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)' }}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900">
            {count} {pluralize(count, 'item')} • {formatMoney(subtotal)}
          </p>
          <p className="text-[11px] text-neutral-600">
            {remaining > 0 ? (
              <>Add <span className="font-semibold">{formatMoney(remaining)}</span> for free shipping</>
            ) : (
              <span className="font-semibold text-emerald-700">Free shipping unlocked</span>
            )}
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={openCart}
            className="rounded-lg border border-neutral-200 px-3 py-2 text-sm font-semibold text-neutral-800"
            aria-label="View cart"
          >
            View Cart
          </button>
          <a
            href="#checkout"
            className="rounded-lg bg-[#2F5D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
            aria-label="Proceed to checkout"
          >
            Checkout
          </a>
        </div>
      </div>
    </div>
  )
}
