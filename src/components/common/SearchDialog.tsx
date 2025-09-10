/**
 * SearchDialog.tsx
 * Minimal, elegant command-style search using Radix Dialog.
 * - Filters categories and featured products by name.
 * - Keyboard-friendly, accessible, and fast.
 */

import * as Dialog from '@radix-ui/react-dialog'
import { Search } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { categories, featuredProducts } from '../../data/catalog'

interface SearchDialogProps {
  /** Controlled open state */
  open: boolean
  /** Open change handler */
  onOpenChange: (open: boolean) => void
}

/** Normalized search result item. */
interface ResultItem {
  id: string
  label: string
  href: string
  kind: 'category' | 'product'
}

/** SearchDialog - Command-style search overlay with live results. */
export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Focus the input automatically when the dialog opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    } else {
      setQuery('')
    }
  }, [open])

  /** Build the searchable index (static data for demo). */
  const index = useMemo<ResultItem[]>(() => {
    const catResults: ResultItem[] = categories.map((c) => ({
      id: c.id,
      label: c.name,
      href: `#${c.id}`,
      kind: 'category',
    }))
    const prodResults: ResultItem[] = featuredProducts.map((p) => ({
      id: p.id,
      label: p.name,
      href: `#featured`,
      kind: 'product',
    }))
    return [...catResults, ...prodResults]
  }, [])

  /** Case-insensitive filtering with basic substring match. */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return index
    return index.filter((r) => r.label.toLowerCase().includes(q))
  }, [index, query])

  /** Navigate to first result on Enter. */
  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && results.length > 0) {
      const top = results[0]
      window.location.hash = top.href.replace('#', '')
      onOpenChange(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-24 z-[71] w-[92vw] max-w-2xl -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
          aria-label="Search"
        >
          {/* Input */}
          <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-3">
            <Search className="h-5 w-5 text-neutral-600" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search gear or categories…"
              className="w-full bg-transparent text-sm text-neutral-900 placeholder:text-neutral-500 focus:outline-none"
              aria-label="Search"
            />
          </div>

          {/* Results */}
          <div className="max-h-[50vh] overflow-auto px-2 py-2">
            {results.length === 0 ? (
              <p className="px-2 py-3 text-sm text-neutral-600">No results</p>
            ) : (
              <ul className="space-y-1">
                {results.map((r) => (
                  <li key={`${r.kind}-${r.id}`}>
                    <a
                      href={r.href}
                      className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-neutral-50"
                      onClick={() => onOpenChange(false)}
                    >
                      <span className="text-sm text-neutral-900">{r.label}</span>
                      <span
                        className={`text-[10px] uppercase tracking-wide ${
                          r.kind === 'category' ? 'text-[#2F5D3A]' : 'text-neutral-500'
                        }`}
                      >
                        {r.kind}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
