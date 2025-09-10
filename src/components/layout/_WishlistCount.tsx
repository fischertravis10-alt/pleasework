/**
 * _WishlistCount.tsx
 * Small derived selector for wishlist count used by Header (split for cleanliness).
 */

import { useWishlistStore } from '../../stores/wishlist'

export default function WishlistCount() {
  const count = useWishlistStore((s) => s.count())
  return <>{count}</>
}
