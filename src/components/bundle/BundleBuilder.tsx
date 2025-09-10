/** 
 * BundleBuilder.tsx
 * Customer-facing builder to compose a 2–3 item bundle with live discount preview.
 * - Curated pool (featured products).
 * - Enforces selection min/max and provides instant price/benefits feedback.
 * - Adds selected items to cart in one click.
 * - Enhancements:
 *   - CLS polish: ImageWithSkeleton with width/height to reduce layout shift.
 *   - Analytics hooks: 'view_bundle_builder', 'bundle_toggle', 'add_bundle'.
 *   - A11y: announce bundle add via SR live region.
 *   - UX: Clear selection, Recommended preset, mini-thumbnails of picks.
 */

import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2, Plus, XCircle, Gift, RefreshCcw, Wand2 } from 'lucide-react'
import { featuredProducts } from '../../data/catalog'
import type { Product } from '../../data/catalog'
import { useCartStore } from '../../stores/cart'
import { toast } from 'sonner'
import { formatMoney } from '../../utils/format'
import { announce } from '../../utils/announce'
import {
  computeFreeGiftEligibility,
  estimateShippingUsingConfig,
  getBundleDiscountRate,
} from '../../utils/pricing'
import ImageWithSkeleton from '../common/ImageWithSkeleton'
import { track } from '../../utils/analytics'

/** Selection map type keyed by product id. */
type SelectionMap = Record<string, Product>

/** Small tile card for select/deselect interaction with CLS-safe image. */
function PickCard({
  product,
  selected,
  onToggle,
}: {
  product: Product
  selected: boolean
  onToggle: (p: Product) => void
}) {
  return (
    <button
      onClick={() => onToggle(product)}
      className={`group relative flex h-full w-full flex-col overflow-hidden rounded-xl border p-3 text-left transition-shadow ${
        selected
          ? 'border-emerald-600 ring-2 ring-emerald-600/30'
          : 'border-[#E6D8B8] hover:shadow-md'
      } bg-white`}
      aria-pressed={selected}
      aria-label={`${selected ? 'Remove' : 'Add'} ${product.name} ${selected ? 'from' : 'to'} bundle`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-50">
        <ImageWithSkeleton
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          draggable={false}
          sizes="(min-width: 640px) 33vw, 50vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={800}
          height={600}
          containerClassName="h-full w-full"
        />
      </div>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-neutral-900" title={product.name}>
            {product.name}
          </p>
          <p className="text-sm font-semibold text-[#2F5D3A]">${product.price.toFixed(2)}</p>
        </div>
        <div className="shrink-0">
          {selected ? (
            <CheckCircle2 className="h-5 w-5 text-emerald-600" />
          ) : (
            <Plus className="h-5 w-5 text-neutral-400 group-hover:text-[#2F5D3A]" />
          )}
        </div>
      </div>
    </button>
  )
}

/** BundleBuilder - Compose a discounted bundle (2–3 items). */
export default function BundleBuilder() {
  // Curated pool: first 6 featured items
  const pool: Product[] = useMemo(() => featuredProducts.slice(0, 6), [])
  const [selected, setSelected] = useState<SelectionMap>({})

  // Track a view of the builder for analytics
  useEffect(() => {
    try { track('view_bundle_builder') } catch {}
  }, [])

  const picks = Object.values(selected)
  const count = picks.length

  const subtotal = picks.reduce((s, p) => s + p.price, 0)
  const rate = getBundleDiscountRate(count)
  const discount = Math.round(subtotal * rate * 100) / 100
  const afterDiscount = Math.max(0, subtotal - discount)

  const shipping = estimateShippingUsingConfig(afterDiscount)
  const gift = computeFreeGiftEligibility(afterDiscount)

  const valid = count >= 2 && count <= 3
  const overLimit = count > 3
  const underMin = count < 2

  /** Toggle a pick and emit analytics. */
  function toggle(p: Product) {
    setSelected((prev) => {
      const exists = !!prev[p.id]
      try { track('bundle_toggle', { id: p.id, name: p.name, selected: !exists }) } catch {}
      if (!exists && Object.keys(prev).length >= 3) {
        toast.warning('Bundle limit reached', { description: 'You can select up to 3 items.' })
        return prev
      }
      const next = { ...prev }
      if (exists) delete next[p.id]
      else next[p.id] = p
      return next
    })
  }

  /** Clear all selections. */
  function clearSelection() {
    setSelected({})
  }

  /** Apply a simple recommended preset (first 2 items in pool) */
  function applyPreset() {
    const preset = pool.slice(0, 2)
    const map: SelectionMap = preset.reduce((acc, p) => { acc[p.id] = p; return acc }, {} as SelectionMap)
    setSelected(map)
  }

  /** Add all selected items to cart with feedback + analytics. */
  function addBundle() {
    if (!valid) return
    const add = useCartStore.getState().add
    picks.forEach((p) => add(p, 1))
    setSelected({})
    toast.success('Bundle added', { description: `${count} item${count > 1 ? 's' : ''} added to cart` })
    announce('Bundle added to cart')
    try {
      track('add_bundle', {
        count,
        items: picks.map((p) => ({ id: p.id, price: p.price })),
        subtotal,
        rate,
        discount,
        afterDiscount,
      })
      // Hint open cart
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.dispatchEvent(new Event('open-cart' as any))
    } catch {
      // ignore
    }
  }

  return (
    <section id="bundle" aria-label="Bundle builder" tabIndex={-1} className="mx-auto max-w-7xl px-4 scroll-mt-24 md:scroll-mt-28 outline-none">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold text-neutral-900">Bundle & Save</h2>
        <p className="text-sm text-neutral-700">Pick 2–3 items to unlock extra savings</p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Picks grid */}
        <div className="lg:col-span-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {pool.map((p) => (
              <PickCard
                key={p.id}
                product={p}
                selected={!!selected[p.id]}
                onToggle={toggle}
              />
            ))}
          </div>

          {/* Selection status */}
          <div className="mt-3 flex items-center gap-2 text-xs">
            {overLimit ? (
              <span className="inline-flex items-center gap-1 rounded bg-amber-100 px-2 py-1 text-amber-900">
                <XCircle className="h-4 w-4" />
                You selected more than 3. Remove {count - 3} item{count - 3 > 1 ? 's' : ''}.
              </span>
            ) : underMin ? (
              <span className="inline-flex items-center gap-1 rounded bg-neutral-100 px-2 py-1 text-neutral-800">
                Select {2 - count} more item{2 - count > 1 ? 's' : ''} to qualify.
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-1 text-emerald-900">
                <CheckCircle2 className="h-4 w-4" />
                Great! Your bundle qualifies for a discount.
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-4">
          <div className="rounded-2xl border border-[#E6D8B8] bg-white p-4">
            <div className="flex items-start justify-between">
              <h3 className="text-sm font-bold text-neutral-900">Bundle summary</h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={applyPreset}
                  className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-[11px] font-semibold text-neutral-800 hover:bg-neutral-50"
                  aria-label="Apply recommended preset"
                  title="Apply recommended preset"
                >
                  <Wand2 className="h-3.5 w-3.5" /> Preset
                </button>
                <button
                  type="button"
                  onClick={clearSelection}
                  className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-[11px] font-semibold text-neutral-800 hover:bg-neutral-50"
                  aria-label="Clear selection"
                  title="Clear selection"
                >
                  <RefreshCcw className="h-3.5 w-3.5" /> Clear
                </button>
              </div>
            </div>

            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Items</span>
                <span className="font-semibold text-neutral-900">{count}</span>
              </div>

              {/* Picks mini-thumbnails */}
              {count > 0 && (
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  {picks.map((p) => (
                    <div key={p.id} className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-1">
                      <img
                        src={p.image}
                        alt={p.name}
                        width={28}
                        height={21}
                        className="h-7 w-9 rounded object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="max-w-[8rem] truncate text-xs text-neutral-800">{p.name}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Subtotal</span>
                <span className="font-semibold text-neutral-900">{formatMoney(subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-emerald-700">
                <span className="text-neutral-800">Bundle savings ({Math.round(rate * 100)}%)</span>
                <span className="font-semibold">- {formatMoney(discount)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-700">Shipping</span>
                <span className="font-semibold text-neutral-900">
                  {shipping.cost === 0 ? 'Free' : formatMoney(shipping.cost)}
                </span>
              </div>

              <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3 text-xs">
                {gift.eligible ? (
                  <p className="inline-flex items-center gap-2 text-emerald-800">
                    <Gift className="h-4 w-4" />
                    You unlocked a free gift!
                  </p>
                ) : (
                  <p className="inline-flex items-center gap-2 text-neutral-800">
                    <Gift className="h-4 w-4 text-[#2F5D3A]" />
                    You're <span className="font-semibold">{formatMoney(gift.remaining)}</span> away from a free gift.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-sm font-semibold text-neutral-900">Est. total</span>
                <span className="text-lg font-extrabold text-neutral-900">
                  {formatMoney(afterDiscount + shipping.cost)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-600">Tax estimated at checkout.</p>
            </div>

            <button
              onClick={addBundle}
              disabled={!valid}
              className={`mt-3 w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors ${
                valid ? 'bg-[#2F5D3A] hover:bg-[#254D30]' : 'bg-neutral-400'
              }`}
              aria-disabled={!valid}
              aria-label="Add bundle to cart"
            >
              Add bundle to cart
            </button>
          </div>
        </aside>
      </div>
    </section>
  )
}
