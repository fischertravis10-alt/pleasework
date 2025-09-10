/**
 * QuickCheckoutDialog.tsx
 * Amazon-style 1-click purchase confirmation:
 * - Summarizes items, applies bundle discount logic, estimates shipping & tax.
 * - Places order instantly and shows a confirmation.
 * - Non-invasive: does not modify the cart by default (simulated purchase).
 */

import * as Dialog from '@radix-ui/react-dialog'
import { CheckCircle2, X } from 'lucide-react'
import type { Product } from '../../data/catalog'
import { formatMoney } from '../../utils/format'
import { getBundleDiscountRate, estimateShippingUsingConfig, estimateTax } from '../../utils/pricing'
import { toast } from 'sonner'
import { announce } from '../../utils/announce'

export interface CheckoutItem {
  product: Product
  qty: number
}

interface QuickCheckoutDialogProps {
  /** Controlled open state */
  open: boolean
  /** Change handler */
  onOpenChange: (open: boolean) => void
  /** Items to purchase instantly */
  items: CheckoutItem[]
}

/** compute totals for provided items using existing pricing helpers. */
function computeTotals(items: CheckoutItem[]) {
  const itemCount = items.reduce((acc, r) => acc + r.qty, 0)
  const rate = getBundleDiscountRate(itemCount)
  const subtotal = items.reduce((sum, r) => sum + r.product.price * r.qty, 0)
  const discount = Math.round(subtotal * rate * 100) / 100
  const afterDiscount = Math.max(0, subtotal - discount)
  const shipping = estimateShippingUsingConfig(afterDiscount)
  const tax = estimateTax(afterDiscount, shipping.cost)
  const total = afterDiscount + shipping.cost + tax
  return { itemCount, rate, subtotal, discount, afterDiscount, shipping, tax, total }
}

/** Generates a simple order id. */
function generateOrderId() {
  const n = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `HCG-${Date.now().toString().slice(-6)}-${n}`
}

/** QuickCheckoutDialog - confirms instant order and simulates placement. */
export default function QuickCheckoutDialog({ open, onOpenChange, items }: QuickCheckoutDialogProps) {
  const totals = computeTotals(items)

  function placeOrder() {
    const id = generateOrderId()
    toast.success('Order placed', { description: `Order ${id}` })
    announce(`Order placed. Order ${id}. Total ${formatMoney(totals.total)}`)
    onOpenChange(false)
    try {
      // optional analytics
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any)?.track?.('purchase', {
        order_id: id,
        total: totals.total,
        items: items.map((i) => ({ id: i.product.id, name: i.product.name, qty: i.qty, price: i.product.price })),
      })
    } catch {}
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-20 z-[81] w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
          aria-label="1-click checkout"
        >
          <div className="flex items-center justify-between border-b border-[#E6D8B8] px-5 py-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#2F5D3A]" />
              <Dialog.Title className="text-sm font-bold text-neutral-900">Confirm your purchase</Dialog.Title>
            </div>
            <Dialog.Close className="rounded p-1 text-neutral-600 hover:bg-neutral-100" aria-label="Close">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Items */}
          <div className="max-h-[55vh] overflow-auto px-5 py-4">
            <ul className="space-y-3">
              {items.map(({ product, qty }) => (
                <li key={product.id} className="flex gap-3">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                      className="h-full w-full object-cover"
                      width={256}
                      height={256}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-neutral-900">{product.name}</p>
                    <p className="text-sm text-neutral-700">
                      Qty {qty} • <span className="font-semibold text-[#2F5D3A]">{formatMoney(product.price)}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Totals */}
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatMoney(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex items-center justify-between text-emerald-700">
                  <span>Bundle savings ({Math.round(totals.rate * 100)}%)</span>
                  <span className="font-semibold">- {formatMoney(totals.discount)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Shipping</span>
                <span className="font-semibold text-neutral-900">
                  {totals.shipping.cost === 0 ? 'Free' : formatMoney(totals.shipping.cost)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Estimated tax</span>
                <span className="font-semibold text-neutral-900">{formatMoney(totals.tax)}</span>
              </div>
              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-semibold text-neutral-900">Total</span>
                <span className="text-lg font-extrabold text-neutral-900">{formatMoney(totals.total)}</span>
              </div>
              <p className="text-[11px] text-neutral-600">This is a demo 1-click confirmation. No payment is processed.</p>
            </div>
          </div>

          {/* Actions */}
          <div className="border-t border-[#E6D8B8] p-5">
            <button
              onClick={placeOrder}
              className="w-full rounded-lg bg-[#2F5D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
              aria-label="Place order"
            >
              Place order
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
