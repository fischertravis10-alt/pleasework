/**
 * PromoBar.tsx
 * Dismissible promo banner with a singleton guard to prevent duplicate rendering.
 * - High-contrast, accessible, and dark-mode ready.
 * - Persists dismissal in localStorage.
 * - Includes quick copy for TRAIL10 and a simple end-of-day countdown.
 *
 * Usage: Place once in the app layout (Header or App). If mounted elsewhere too,
 *        the guard ensures only the first instance renders.
 */

import { useEffect, useState } from 'react'
import { Percent, Truck, Clock, X } from 'lucide-react'
import { toast } from 'sonner'

/** LocalStorage key to persist dismissal state across sessions. */
const STORAGE_KEY = 'promo:v1:dismissed'

/** Module-level flag: only one mounted instance should render. */
let hasMountedInstance = false

/**
 * formatTimeLeft - Formats milliseconds into HH:MM:SS.
 */
function formatTimeLeft(ms: number): string {
  if (ms <= 0) return '00:00:00'
  const h = Math.floor(ms / 3_600_000)
  const m = Math.floor((ms % 3_600_000) / 60_000)
  const s = Math.floor((ms % 60_000) / 1_000)
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

/**
 * getEndOfDay - Returns a Date representing local end of day (23:59:59.999).
 */
function getEndOfDay(): Date {
  const now = new Date()
  const end = new Date(now)
  end.setHours(23, 59, 59, 999)
  return end
}

/**
 * PromoBar - Dismissible, singleton top banner for promotions.
 */
export default function PromoBar() {
  const [isPrimary, setIsPrimary] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [timeLeft, setTimeLeft] = useState('')

  // Read persisted dismissal
  useEffect(() => {
    try {
      const flag = localStorage.getItem(STORAGE_KEY)
      if (flag === '1') setDismissed(true)
    } catch {
      // ignore read failures (privacy mode, etc.)
    }
  }, [])

  // Enforce singleton mount
  useEffect(() => {
    if (dismissed) return
    if (hasMountedInstance) {
      setIsPrimary(false)
      return
    }
    hasMountedInstance = true
    setIsPrimary(true)
    return () => {
      // Release the singleton on unmount
      if (isPrimary) hasMountedInstance = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dismissed])

  // Countdown to end-of-day
  useEffect(() => {
    if (!isPrimary || dismissed) return
    function tick() {
      const ms = getEndOfDay().getTime() - Date.now()
      setTimeLeft(formatTimeLeft(ms))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [isPrimary, dismissed])

  if (!isPrimary || dismissed) return null

  /** Copy the first-order promo code to clipboard with feedback. */
  function copyCode() {
    const code = 'TRAIL10'
    try {
      void navigator.clipboard?.writeText(code)
      toast.success('Code copied', { description: `${code} will be applied at checkout` })
    } catch {
      toast.message(`Use code ${code} at checkout`)
    }
  }

  /** Dismiss and persist. */
  function handleDismiss() {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore write failures
    }
  }

  return (
    <div
      role="region"
      aria-label="Promotions"
      className="sticky top-0 z-40 w-full border-b border-[#E6D8B8] bg-[#F7F2E1] text-neutral-900 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Bundle & Save chip */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-[12px] font-semibold dark:bg-neutral-800">
            <Percent className="h-4 w-4 text-[#2F5D3A]" />
            <span>Bundle &amp; save up to 15% · First order code TRAIL10</span>
            <button
              type="button"
              onClick={copyCode}
              className="ml-1 rounded bg-[#2F5D3A] px-2 py-0.5 text-[11px] font-bold text-white hover:bg-[#254D30] focus:outline-none focus:ring-2 focus:ring-[#2F5D3A]/50"
              aria-label="Copy code TRAIL10"
            >
              Copy
            </button>
            <span className="ml-1 inline-flex items-center gap-1 text-[12px] text-neutral-700 dark:text-neutral-300">
              <Clock className="h-3.5 w-3.5" />
              Ends in {timeLeft}
            </span>
          </span>

          {/* Free shipping chip */}
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-2 py-1 text-[12px] font-semibold dark:bg-neutral-800">
            <Truck className="h-4 w-4 text-[#2F5D3A]" />
            <span>Free shipping over $39.00</span>
          </span>
        </div>

        {/* Dismiss */}
        <button
          type="button"
          onClick={handleDismiss}
          className="rounded p-1 text-neutral-700 hover:bg-white focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:text-neutral-300 dark:hover:bg-neutral-800"
          aria-label="Dismiss promotions"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
