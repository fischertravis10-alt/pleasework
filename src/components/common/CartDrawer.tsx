/** 
 * CartDrawer.tsx
 * Slide-in right drawer that shows cart contents, totals, and actions.
 * - Adds bundle savings (10–15%), shipping estimator, and estimated tax.
 * - Cross-sell rail to increase AOV.
 * - Uses Radix Dialog for accessible overlay and focus management.
 * - Enhancement: async decode + no-drag images; free-gift eligibility hint.
 */

import * as Dialog from '@radix-ui/react-dialog'
import { Minus, Plus, ShoppingBag, Trash2, X, Info, Gift } from 'lucide-react'
import { useCartStore } from '../../stores/cart'
import FreeShippingProgress from './FreeShippingProgress'
import { formatMoney } from '../../utils/format'
import CrossSellRail from './CrossSellRail'
import {
  computeCartDiscount,
  estimateShipping,
  getBundleDiscountRate,
  estimateTax,
  getFreeShippingThreshold,
  computeFreeGiftEligibility,
} from '../../utils/pricing'

interface CartDrawerProps {
  /** Controlled open state */
  open: boolean
  /** Open state handler */
  onOpenChange: (open: boolean) => void
}

/** CartDrawer - Accessible right-side cart panel with totals and AOV drivers. */
export default function CartDrawer({ open, onOpenChange }: CartDrawerProps) {
  const { items, increment, decrement, remove, subtotal, totalItems, clear } = useCartStore()

  const rows = Object.values(items)
  const count = totalItems()
  const rawSubtotal = subtotal()

  // Bundle savings and shipping estimator
  const { rate: discountRate, amount: discountAmount } = computeCartDiscount(items)
  const subtotalAfterDiscount = Math.max(0, rawSubtotal - discountAmount)
  const freeThreshold = getFreeShippingThreshold()
  const shipping = estimateShipping(subtotalAfterDiscount, freeThreshold)
  const tax = estimateTax(subtotalAfterDiscount, shipping.cost)
  const orderTotal = subtotalAfterDiscount + shipping.cost + tax

  // Next discount tier hint
  const itemCount = rows.reduce((acc, r) => acc + r.qty, 0)
  const nextTierNeeded = itemCount >= 3 ? 0 : Math.max(0, (itemCount === 1 ? 2 : 3) - itemCount)

  // Free gift eligibility (based on subtotal after bundle discount, before shipping)
  const gift = computeFreeGiftEligibility(subtotalAfterDiscount)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-white shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
          aria-label="Shopping cart"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E6D8B8] px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#2F5D3A] p-2">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <Dialog.Title className="text-sm font-semibold text-neutral-900">
                Your Cart ({count})
              </Dialog.Title>
            </div>
            <Dialog.Close className="rounded p-1 text-neutral-600 hover:bg-neutral-100" aria-label="Close cart">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto px-5 py-4">
            {rows.length === 0 ? (
              <p className="text-sm text-neutral-700">Your cart is empty.</p>
            ) : (
              <ul className="space-y-4">
                {rows.map(({ product, qty }) => (
                  <li key={product.id} className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900">{product.name}</p>
                      <p className="text-sm text-[#2F5D3A]">${product.price.toFixed(2)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="rounded border border-neutral-200 p-1 text-neutral-700 hover:bg-neutral-100"
                          aria-label="Decrease quantity"
                          onClick={() => decrement(product.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-[2ch] text-center text-sm">{qty}</span>
                        <button
                          className="rounded border border-neutral-200 p-1 text-neutral-700 hover:bg-neutral-100"
                          aria-label="Increase quantity"
                          onClick={() => increment(product.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          className="ml-2 rounded border border-neutral-200 p-1 text-neutral-700 hover:bg-neutral-100"
                          aria-label="Remove item"
                          onClick={() => remove(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#E6D8B8] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Subtotal</span>
              <span className="text-base font-semibold text-neutral-900">{formatMoney(rawSubtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="mt-2 flex items-center justify-between text-emerald-700">
                <span className="text-sm font-semibold">Bundle savings ({Math.round(discountRate * 100)}%)</span>
                <span className="text-base font-semibold">- {formatMoney(discountAmount)}</span>
              </div>
            )}

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-neutral-700">Shipping</span>
              <span className="text-base font-semibold text-neutral-900">
                {shipping.cost === 0 ? 'Free' : formatMoney(shipping.cost)}
              </span>
            </div>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-neutral-700">Estimated tax</span>
              <span className="text-base font-semibold text-neutral-900">{formatMoney(tax)}</span>
            </div>

            <div className="mt-2">
              <FreeShippingProgress subtotal={subtotalAfterDiscount} threshold={freeThreshold} />
            </div>

            {/* Next bundle tier hint */}
            {nextTierNeeded > 0 && (
              <p className="mt-2 inline-flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-900">
                <Info className="mt-0.5 h-4 w-4" />
                Add <span className="font-semibold">{nextTierNeeded}</span> more item{nextTierNeeded > 1 ? 's' : ''} to unlock
                <span className="ml-1 font-semibold">
                  {Math.round(getBundleDiscountRate(itemCount + nextTierNeeded) * 100)}% off
                </span>
              </p>
            )}

            {/* Free gift eligibility hint */}
            <div className="mt-2">
              {gift.eligible ? (
                <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-900">
                  <Gift className="h-4 w-4" />
                  You unlocked a free gift for this order.
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 rounded-lg bg-neutral-50 p-3 text-xs text-neutral-800">
                  <Gift className="h-4 w-4 text-[#2F5D3A]" />
                  You're <span className="font-semibold">{formatMoney(gift.remaining)}</span> away from a free gift.
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-sm font-semibold text-neutral-900">Total</span>
              <span className="text-lg font-extrabold text-neutral-900">{formatMoney(orderTotal)}</span>
            </div>

            <p className="mt-1 text-[11px] text-neutral-600">
              Tax is estimated and finalized at checkout.
            </p>

            <div className="mt-4 flex items-center gap-2">
              <a
                href="#checkout"
                className="flex-1 rounded-lg bg-[#2F5D3A] px-4 py-2 text-center text-sm font-semibold text-white hover:bg-[#254D30]"
                aria-label="Proceed to checkout"
              >
                Secure Checkout
              </a>
              {rows.length > 0 && (
                <button
                  className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
                  onClick={clear}
                  aria-label="Clear cart"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Cross-sell suggestions */}
            {rows.length > 0 && <CrossSellRail excludeIds={rows.map((r) => r.product.id)} />}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
