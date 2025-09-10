/**
 * recent.ts
 * Persisted store of recently viewed products (de-duplicated, capped).
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Product } from '../data/catalog'

interface RecentState {
  items: Product[]
  /** Add or move-to-front a product in the recent list. */
  add: (product: Product) => void
  /** Clear all recently viewed. */
  clear: () => void
}

const MAX_RECENT = 10

/**
 * useRecentStore - Persisted 'recently viewed' products.
 */
export const useRecentStore = create<RecentState>()(
  persist(
    (set, get) => ({
      items: [],
      add: (product) =>
        set((state) => {
          const next = [product, ...state.items.filter((p) => p.id !== product.id)].slice(0, MAX_RECENT)
          return { items: next }
        }),
      clear: () => set({ items: [] }),
    }),
    {
      name: 'hcg-recent',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items }),
    }
  )
)
