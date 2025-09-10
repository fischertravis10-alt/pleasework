/** 
 * ProductQuickView.tsx
 * Quick view modal to reduce friction: larger imagery, description, qty control, trust badges,
 * and free-shipping progress messaging.
 * - Uses ImageWithSkeleton for CLS stability and nicer perceived loading.
 * - Includes reduced-motion–aware open animation via Motion One.
 * - Announces add-to-cart events to the shared SR live region for accessibility.
 */

import * as Dialog from '@radix-ui/react-dialog'
import { Minus, Plus, ShieldCheck, Truck, X } from 'lucide-react'
import { useState, useMemo, useEffect, useRef } from 'react'
import ImageWithSkeleton from './ImageWithSkeleton'
import { animate } from 'motion'
import type { Product } from '../../data/catalog'
import { useCartStore, FREE_SHIPPING_THRESHOLD } from '../../stores/cart'
import { formatMoney } from '../../utils/format'
import FreeShippingProgress from './FreeShippingProgress'
import { toast } from 'sonner'
import { announce } from '../../utils/announce'

interface ProductQuickViewProps {
  /** Whether the modal is open */
  open: boolean
  /** Change handler */
  onOpenChange: (open: boolean) => void
  /** Product to display */
  product: Product | null
}

/** ProductQuickView - Displays product details and a fast way to add to cart. */
export default function ProductQuickView({ open, onOpenChange, product }: ProductQuickViewProps) {
  const add = useCartStore((s) => s.add)
  const [qty, setQty] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)

  /** Check reduced-motion preference. */
  function prefersReducedMotion() {
    try {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    } catch {
      return false
    }
  }

  // Animate on open (reduced-motion aware)
  useEffect(() => {
    if (!open || !contentRef.current || prefersReducedMotion()) return
    const el = contentRef.current
    el.style.opacity = '0'
    el.style.transform = 'translateY(10px) scale(0.98)'
    animate(el, { opacity: 1, transform: 'translateY(0px) scale(1)' }, { duration: 0.25, easing: 'ease-out' })
  }, [open])

  const subtotal = useCartStore((s) =>
    Object.values(s.items).reduce((sum, r) => sum + r.product.price * r.qty, 0)
  )
  const totalWithThis = useMemo(
    () => subtotal + (product?.price ?? 0) * qty,
    [subtotal, product, qty]
  )
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalWithThis)

  if (!product) return null

  /** Add to cart with feedback and close. */
  function onAdd() {
    add(product, qty)
    toast.success('Added to cart', { description: `${product.name} × ${qty}` })
    announce(`Added ${product.name} × ${qty} to cart`)
    onOpenChange(false)
  }

  /** Discount percent if compareAtPrice is provided. */
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          ref={contentRef}
          className="fixed left-1/2 top-20 z-[81] w-[92vw] max-w-3xl -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
          aria-label={product.name}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-64 w-full md:h-full">
              <ImageWithSkeleton
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                draggable={false}
                width={1200}
                height={900}
                containerClassName="h-full w-full"
              />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <Dialog.Title className="text-base font-bold text-neutral-900">{product.name}</Dialog.Title>
                <Dialog.Close className="rounded p-1 text-neutral-600 hover:bg-neutral-100" aria-label="Close">
                  <X className="h-5 w-5" />
                </Dialog.Close>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <p className="text-xl font-extrabold text-[#2F5D3A]">{formatMoney(product.price)}</p>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <>
                    <p className="text-sm text-neutral-500 line-through">{formatMoney(product.compareAtPrice)}</p>
                    <span className="rounded-full bg-rose-600/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                      -{discount}% sale
                    </span>
                  </>
                )}
              </div>

              {product.description && (
                <p className="mt-3 text-sm text-neutral-700">{product.description}</p>
              )}

              <div className="mt-4 flex items-center gap-3">
                <div className="inline-flex items-center rounded-lg border border-neutral-200">
                  <button
                    className="px-2 py-2 text-neutral-700 hover:bg-neutral-100"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2ch] text-center text-sm font-semibold">{qty}</span>
                  <button
                    className="px-2 py-2 text-neutral-700 hover:bg-neutral-100"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <button
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#2F5D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
                  onClick={onAdd}
                  aria-label="Add to cart"
                >
                  Add to cart
                </button>
              </div>

              <div className="mt-4">
                <FreeShippingProgress subtotal={totalWithThis} threshold={FREE_SHIPPING_THRESHOLD} />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="rounded-lg border border-[#E6D8B8] bg-white p-3">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-[#2F5D3A]" />
                    <p className="text-xs font-semibold text-neutral-900">Free shipping over ${FREE_SHIPPING_THRESHOLD}</p>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-600">
                    {remaining > 0
                      ? `Add ${formatMoney(remaining)} to unlock free shipping.`
                      : 'Free shipping unlocked on this order.'}
                  </p>
                </div>
                <div className="rounded-lg border border-[#E6D8B8] bg-white p-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#2F5D3A]" />
                    <p className="text-xs font-semibold text-neutral-900">30-day free returns</p>
                  </div>
                  <p className="mt-1 text-[11px] text-neutral-600">Shop risk-free. Warranty-backed products.</p>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
