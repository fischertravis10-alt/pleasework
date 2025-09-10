/**
 * WishlistDrawer.tsx
 * Right-side drawer listing saved items with quick actions:
 * - Add to cart
 * - Remove from wishlist
 * - Add all to cart
 * - Clear wishlist
 */

import * as Dialog from '@radix-ui/react-dialog'
import { Heart, ShoppingCart, Trash2, X } from 'lucide-react'
import { useWishlistStore } from '../../stores/wishlist'
import { useCartStore } from '../../stores/cart'
import { formatMoney } from '../../utils/format'
import { toast } from 'sonner'
import type { Product } from '../../data/catalog'

interface WishlistDrawerProps {
  /** Controlled open state */
  open: boolean
  /** Change handler */
  onOpenChange: (open: boolean) => void
}

/** WishlistDrawer - accessible panel for saved items. */
export default function WishlistDrawer({ open, onOpenChange }: WishlistDrawerProps) {
  const list = useWishlistStore((s) => s.list())
  const remove = useWishlistStore((s) => s.remove)
  const clear = useWishlistStore((s) => s.clear)
  const add = useCartStore((s) => s.add)

  function handleAdd(p: Product) {
    add(p, 1)
    toast.success('Added to cart', { description: p.name })
  }

  function handleAddAll() {
    if (list.length === 0) return
    list.forEach((p) => add(p, 1))
    toast.success('Added all to cart', { description: `${list.length} item(s)` })
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-white shadow-xl outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right"
          aria-label="Wishlist"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#E6D8B8] px-5 py-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#2F5D3A] p-2">
                <Heart className="h-5 w-5 text-white" />
              </div>
              <Dialog.Title className="text-sm font-semibold text-neutral-900">
                Wishlist ({list.length})
              </Dialog.Title>
            </div>
            <Dialog.Close className="rounded p-1 text-neutral-600 hover:bg-neutral-100" aria-label="Close wishlist">
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-auto px-5 py-4">
            {list.length === 0 ? (
              <p className="text-sm text-neutral-700">Your wishlist is empty.</p>
            ) : (
              <ul className="space-y-4">
                {list.map((p) => (
                  <li key={p.id} className="flex gap-3">
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                        className="h-full w-full object-cover"
                        width={320}
                        height={320}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-neutral-900">{p.name}</p>
                      <p className="text-sm text-[#2F5D3A]">{formatMoney(p.price)}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D3A] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#254D30]"
                          onClick={() => handleAdd(p)}
                          aria-label={`Add ${p.name} to cart`}
                        >
                          <ShoppingCart className="h-4 w-4" />
                          Add to cart
                        </button>
                        <button
                          className="inline-flex items-center gap-1 rounded-lg border border-neutral-200 px-3 py-1.5 text-xs font-semibold text-neutral-800 hover:bg-neutral-100"
                          onClick={() => remove(p.id)}
                          aria-label={`Remove ${p.name} from wishlist`}
                        >
                          <Trash2 className="h-4 w-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-[#E6D8B8] p-5">
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddAll}
                disabled={list.length === 0}
                className={`flex-1 rounded-lg px-4 py-2 text-sm font-semibold text-white ${list.length === 0 ? 'bg-neutral-400' : 'bg-[#2F5D3A] hover:bg-[#254D30]'}`}
                aria-disabled={list.length === 0}
              >
                Add all to cart
              </button>
              {list.length > 0 && (
                <button
                  className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-800 hover:bg-neutral-100"
                  onClick={clear}
                  aria-label="Clear wishlist"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
