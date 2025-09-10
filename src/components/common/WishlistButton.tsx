/**
 * WishlistButton.tsx
 * Small heart toggle button used on product tiles and quick view.
 * - High-contrast, accessible label, keyboard-friendly.
 */

import { Heart } from 'lucide-react'
import type { Product } from '../../data/catalog'
import { useWishlistStore } from '../../stores/wishlist'

interface WishlistButtonProps {
  /** The product to toggle */
  product: Product
  /** Optional additional classes for positioning/styling */
  className?: string
  /** Size of the icon (px) */
  size?: number
}

/** WishlistButton - toggles a product in the wishlist with visual state. */
export default function WishlistButton({ product, className = '', size = 18 }: WishlistButtonProps) {
  const has = useWishlistStore((s) => s.has(product.id))
  const toggle = useWishlistStore((s) => s.toggle)

  const label = has ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`

  return (
    <button
      onClick={(e) => {
        e.stopPropagation()
        e.preventDefault()
        toggle(product)
      }}
      aria-pressed={has}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center rounded-full bg-white text-[#2F5D3A] ring-1 ring-black/10 hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]/50 ${className}`}
    >
      <Heart
        className={`${has ? 'fill-rose-600 text-rose-600' : 'text-[#2F5D3A]'}`}
        width={size}
        height={size}
      />
    </button>
  )
}
