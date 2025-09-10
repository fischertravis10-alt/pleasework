/**
 * WelcomeOfferDialog.tsx
 * Tasteful welcome modal that appears once per user with a first-order code.
 * - Delays show to avoid jarring entry.
 * - Copy-to-clipboard for convenience.
 * - Persistent dismissal in localStorage.
 */

import * as Dialog from '@radix-ui/react-dialog'
import { Gift, Ticket, X, Check } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

const KEY = 'hcg-welcome-dismissed'
const CODE = 'TRAIL10'

/** WelcomeOfferDialog - Once-per-user welcome incentive modal. */
export default function WelcomeOfferDialog() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const shouldShow = useMemo(() => {
    try {
      return localStorage.getItem(KEY) !== '1'
    } catch {
      return true
    }
  }, [])

  useEffect(() => {
    if (!shouldShow) return
    const id = setTimeout(() => setOpen(true), 3200)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldShow])

  function onOpenChange(next: boolean) {
    setOpen(next)
    if (!next) {
      try {
        localStorage.setItem(KEY, '1')
      } catch {
        // ignore
      }
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  if (!shouldShow) return null

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-20 z-[71] w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl outline-none"
          aria-label="Welcome offer"
        >
          <div className="relative">
            <div className="h-36 w-full overflow-hidden bg-neutral-900">
              <img
                src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/b0d8bb83-40aa-4ad7-9ffa-127d3617f392.jpg"
                alt="Aurora night sky over mountains"
                className="h-full w-full object-cover opacity-70"
                loading="lazy"
              />
            </div>
            <Dialog.Close
              className="absolute right-3 top-3 rounded bg-black/40 p-1 text-white hover:bg-black/60"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </Dialog.Close>
          </div>

          <div className="space-y-3 p-5">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-[#2F5D3A] p-2">
                <Gift className="h-5 w-5 text-white" />
              </div>
              <Dialog.Title className="text-base font-bold text-neutral-900">
                Welcome to High Country Gear
              </Dialog.Title>
            </div>
            <p className="text-sm text-neutral-700">
              Here’s <span className="font-semibold">10% off</span> your first order. Combine with our bundle savings for maximum value.
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <Ticket className="h-4 w-4 text-[#2F5D3A]" />
              <span className="text-sm font-mono font-semibold tracking-wide text-neutral-900">{CODE}</span>
              <button
                onClick={copy}
                className={`ml-auto inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2F5D3A] text-white hover:bg-[#254D30]'
                }`}
                aria-label="Copy code"
              >
                {copied ? <Check className="h-4 w-4" /> : null}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-[11px] text-neutral-600">
                Code applies at checkout. Exclusions may apply. Limited-time only.
              </p>
              <button
                onClick={() => onOpenChange(false)}
                className="inline-flex items-center rounded-md bg-neutral-900 px-4 py-2 text-sm font-semibold text-white hover:bg-neutral-800"
                aria-label="Start shopping"
              >
                Start shopping
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
