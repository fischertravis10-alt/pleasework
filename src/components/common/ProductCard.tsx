/**
 * ProductCard - Displays a single product with image, name, price, rating, and optional badge.
 * Updated styles to align with brand colors (forest green primary, mountain red accent).
 */

import { Star, ShoppingCart } from 'lucide-react'
import type { Product } from '../../data/catalog'

interface ProductCardProps {
  /** Product data to render */
  product: Product
  /** Optional: called when user clicks add-to-cart */
  onAddToCart?: (product: Product) => void
}

/** Render stars for ratings with a single decimal precision. */
function Rating({ value }: { value: number }) {
  const stars = Math.round(value)
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < stars ? 'fill-amber-400 text-amber-400' : 'text-neutral-300'}`}
        />
      ))}
      <span className="ml-1 text-xs text-neutral-600">{value.toFixed(1)}</span>
    </div>
  )
}

/** Card with subtle hover effects and strong contrast for readability. */
export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const badgeColor =
    product.badge === 'Best Seller'
      ? 'bg-[#8B3A2F]'
      : product.badge === 'Limited'
      ? 'bg-[#8B3A2F]'
      : 'bg-[#2F5D3A]'

  return (
    <div className="group overflow-hidden rounded-xl border border-[#E6D8B8] bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-neutral-50">
        {product.badge && (
          <span className={`absolute left-3 top-3 z-10 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white ${badgeColor}`}>
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900">{product.name}</h3>
            <p className="mt-1 text-[#2F5D3A]">${product.price.toFixed(2)}</p>
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
      </div>
    </div>
  )
}
