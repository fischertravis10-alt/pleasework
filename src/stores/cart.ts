/**
 * cart.ts
 * Global cart store using Zustand with persistence.
 * - Holds cart items and provides actions for add/remove/increment/decrement/clear.
 * - Exposes derived selectors (totalItems, subtotal) for UI.
 * - Persists to localStorage to maintain cart across sessions.
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '../data/catalog'

/**
 * Represents a single cart line item.
 */
export interface CartItem {
  /** Product reference */
  product: Product
  /** Quantity in cart */
  qty: number
}

/**
 * Cart state and actions API.
 */
interface CartState {
  /** Map of productId -> CartItem for fast updates */
  items: Record<string, CartItem>

  /** Add a product (increments if exists) */
  add: (product: Product, qty?: number) => void
  /** Remove a product entirely */
  remove: (productId: string) => void
  /** Increase qty */
  increment: (productId: string) => void
  /** Decrease qty (removes if hits 0) */
  decrement: (productId: string) => void
  /** Clear everything */
  clear: () => void

  /** Derived: total items count */
  totalItems: () => number
  /** Derived: subtotal in USD */
  subtotal: () => number
}

/** Free shipping threshold in USD (AOV driver) */
export const FREE_SHIPPING_THRESHOLD = 39

/**
 * useCartStore - Global cart store instance with persistence.
 */
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: {},

      /**
       * Add product to cart or increment existing.
       * @param product Product to add
       * @param qty Optional quantity (default 1)
       */
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items[product.id]
          const nextQty = (existing?.qty ?? 0) + qty
          return {
            items: {
              ...state.items,
              [product.id]: { product, qty: nextQty },
            },
          }
        }),

      /**
       * Remove a product from cart entirely.
       */
      remove: (productId) =>
        set((state) => {
          if (!state.items[productId]) return state
          const next = { ...state.items }
          delete next[productId]
          return { items: next }
        }),

      /**
       * Increment quantity for a product.
       */
      increment: (productId) =>
        set((state) => {
          const row = state.items[productId]
          if (!row) return state
          return {
            items: {
              ...state.items,
              [productId]: { ...row, qty: row.qty + 1 },
            },
          }
        }),

      /**
       * Decrement quantity for a product; removes if hits zero.
       */
      decrement: (productId) =>
        set((state) => {
          const row = state.items[productId]
          if (!row) return state
          const nextQty = row.qty - 1
          if (nextQty <= 0) {
            const next = { ...state.items }
            delete next[productId]
            return { items: next }
          }
          return {
            items: {
              ...state.items,
              [productId]: { ...row, qty: nextQty },
            },
          }
        }),

      /**
       * Clear the cart.
       */
      clear: () => set({ items: {} }),

      /**
       * Compute total quantity across all cart items.
       */
      totalItems: () =>
        Object.values(get().items).reduce((acc, r) => acc + r.qty, 0),

      /**
       * Compute subtotal in USD.
       */
      subtotal: () => {
        const { items } = get()
        return Object.values(items).reduce(
          (sum, r) => sum + r.product.price * r.qty,
          0
        )
      },
    }),
    {
      name: 'hcg-cart',
      storage: createJSONStorage(() => localStorage),
      // Persist only items; derived functions are restored by the store creator.
      partialize: (s) => ({ items: s.items }),
    }
  )
)
