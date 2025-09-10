/**
 * wishlist.ts
 * Persistent wishlist store using Zustand. Allows toggling products in/out of a saved list,
 * checking membership, and listing/removing/clearing items. Used by WishlistButton,
 * WishlistDrawer, and product cards/quick view.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '../data/catalog'

/** Wishlist state and actions. */
interface WishlistState {
  /** Map of productId -> Product */
  items: Record<string, Product>

  /** Add a product to wishlist */
  add: (product: Product) => void
  /** Remove a product from wishlist */
  remove: (productId: string) => void
  /** Toggle membership */
  toggle: (product: Product) => void
  /** Clear all */
  clear: () => void

  /** Check if product is in wishlist */
  has: (productId: string) => boolean
  /** Count items */
  count: () => number
  /** List items array */
  list: () => Product[]
}

/**
 * useWishlistStore - global wishlist store with persistence.
 */
export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: {},

      add: (product) =>
        set((state) => ({
          items: { ...state.items, [product.id]: product },
        })),

      remove: (productId) =>
        set((state) => {
          if (!state.items[productId]) return state
          const next = { ...state.items }
          delete next[productId]
          return { items: next }
        }),

      toggle: (product) =>
        set((state) => {
          const exists = !!state.items[product.id]
          if (exists) {
            const next = { ...state.items }
            delete next[product.id]
            return { items: next }
          }
          return { items: { ...state.items, [product.id]: product } }
        }),

      clear: () => set({ items: {} }),

      has: (productId) => !!get().items[productId],
      count: () => Object.keys(get().items).length,
      list: () => Object.values(get().items),
    }),
    {
      name: 'hcg-wishlist',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    }
  )
)
