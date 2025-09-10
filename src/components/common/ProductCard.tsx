/**
 * ProductCard - Displays a single product with image, name, price, rating, badges, and sale info.
 * - Shows discount pill when compareAtPrice is present.
 * - Adds low-stock microcopy to increase urgency.
 * - Dark-mode aware with high contrast.
 * - Uses ImageWithSkeleton for better perceived performance.
 */

import { Star, ShoppingCart, Percent } from 'lucide-react'
import type { Product } from '../../data/catalog'
import { FREE_SHIPPING_THRESHOLD } from '../../stores/cart'
import ImageWithSkeleton from './ImageWithSkeleton'
import { getLowStockThreshold } from '../../config/inventory'
import { useEffect, useRef } from 'react'
import { animate } from 'motion'

interface ProductCardProps {
  /** Product data to render */
  product: Product
  /** Optional: called when user clicks add-to-cart */
  onAddToCart?: (product: Product) => void
  /** Optional: called when user interacts with the product (image/title) */
  onView?: (product: Product) => void
}

/** Render stars for ratings with a single decimal precision. */
function Rating({ value }: { value: number }) {
  const stars = Math.round(value)
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-700'}`}
        />
      ))}
      <span className="ml-1 text-xs text-neutral-600 dark:text-neutral-400">{value.toFixed(1)}</span>
    </div>
  )
}

/** Calculate discount percent when compareAtPrice exists. */
function getDiscountPercent(price?: number, compareAt?: number) {
  if (!price || !compareAt || compareAt <= price) return null
  const pct = Math.round(((compareAt - price) / compareAt) * 100)
  return pct
}

/** Detect reduced motion preference. */
function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/** Card with subtle hover effects and strong contrast for readability. */
export default function ProductCard({ product, onAddToCart, onView }: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  // Subtle mount animation (skips if reduced motion)
  useEffect(() => {
    if (!ref.current || prefersReducedMotion()) return
    const el = ref.current
    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'
    animate(el, { opacity: 1, transform: 'translateY(0px)' }, { duration: 0.35, easing: 'ease-out' })
  }, [])

  const badgeColor =
    product.badge === 'Best Seller'
      ? 'bg-[#8B3A2F]'
      : product.badge === 'Limited'
      ? 'bg-[#8B3A2F]'
      : 'bg-[#2F5D3A]'

  const discount = getDiscountPercent(product.price, product.compareAtPrice)
  /** Calibrated per-category low-stock logic */
  const threshold = getLowStockThreshold(product.categoryId)
  const lowStock = typeof product.stock === 'number' && product.stock > 0 && product.stock <= threshold
  /** Severity tier to emphasize very low counts without being alarmist */
  const severity: 'critical' | 'low' | null = lowStock
    ? (product.stock! <= Math.min(2, threshold) ? 'critical' : 'low')
    : null

  return (
    <div ref={ref} className="group overflow-hidden rounded-xl border border-[#E6D8B8] bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus-within:shadow-md focus-within:ring-2 focus-within:ring-[#2F5D3A]/30 dark:border-neutral-800 dark:bg-neutral-900 dark:shadow-none dark:hover:border-neutral-700">
      <div
        className="relative aspect-square overflow-hidden bg-neutral-50 dark:bg-neutral-800 cursor-pointer"
        onClick={() => onView?.(product)}
        role="button"
        aria-label={`View ${product.name}${lowStock ? `, only ${product.stock} left` : ''}`}
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onView?.(product)}
      >
        {product.badge && (
          <span className={`absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow-sm ring-1 ring-black/10 dark:ring-white/10 ${badgeColor}`}>
            {product.badge}
          </span>
        )}
        {discount !== null && (
          <span className="absolute right-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-rose-600/95 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow ring-1 ring-black/10 dark:ring-white/10">
            <Percent className="h-3 w-3" />
            -{discount}%
          </span>
        )}
        {/* Low-stock pill (bottom-left) with severity color; avoids overlap with badge/discount */}
        {lowStock && (
          <span
            className={`absolute left-3 bottom-3 z-10 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white shadow ring-1 ring-black/10 dark:ring-white/10 ${
              severity === 'critical' ? 'bg-rose-600/95' : 'bg-amber-500/95'
            }`}
          >
            {severity === 'critical' ? `Only ${product.stock} left` : 'Low stock'}
          </span>
        )}

        <ImageWithSkeleton
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          draggable={false}
          width={800}
          height={800}
          containerClassName="h-full w-full"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3
              className="truncate text-sm font-semibold text-neutral-900 hover:underline cursor-pointer dark:text-neutral-100"
              onClick={() => onView?.(product)}
              title={product.name}
            >
              {product.name}
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <p className="text-[#2F5D3A] font-semibold">${product.price.toFixed(2)}</p>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <p className="text-xs text-neutral-500 line-through dark:text-neutral-400">${product.compareAtPrice.toFixed(2)}</p>
              )}
            </div>
            {lowStock && (
              <p className="mt-1 text-[11px] font-medium text-rose-700 dark:text-rose-300">
                Low stock—only {product.stock} left
              </p>
            )}
          </div>
          <Rating value={product.rating} />
        </div>
        <button
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2F5D3A] px-3 py-2 text-sm font-medium text-white hover:bg-[#254D30] focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]/60"
          onClick={() => onAddToCart?.(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to cart
        </button>
        <p className="mt-2 text-[11px] text-neutral-600 dark:text-neutral-400">
          Free shipping over ${FREE_SHIPPING_THRESHOLD}
        </p>
      </div>
    </div>
  )
}
