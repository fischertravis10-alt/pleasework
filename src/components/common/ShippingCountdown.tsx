/**
 * ShippingCountdown.tsx
 * Displays time remaining until 2:00 PM local time for same-day shipping.
 * - Gentle 1s tick, respects reduced motion users by not animating styles.
 */

import { useEffect, useMemo, useState } from 'react'

/** Returns milliseconds until the next 2pm (local) cutoff. */
function msUntilCutoff(now = new Date()): number {
  const cutoff = new Date(now)
  cutoff.setHours(14, 0, 0, 0)
  if (cutoff.getTime() <= now.getTime()) {
    // Past cutoff: set to tomorrow 2pm
    cutoff.setDate(cutoff.getDate() + 1)
  }
  return cutoff.getTime() - now.getTime()
}

/** Formats remaining ms into H:MM:SS string. */
function formatRemaining(ms: number): string {
  const totalSec = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')
  return `${h}:${mm}:${ss}`
}

/**
 * ShippingCountdown - Inline element with remaining time string.
 */
export default function ShippingCountdown() {
  const [remaining, setRemaining] = useState(msUntilCutoff())

  // Determine if user prefers reduced motion (for possible style tweaks)
  const prefersReduced = useMemo(
    () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )

  useEffect(() => {
    const id = setInterval(() => setRemaining(msUntilCutoff()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span
      className={`whitespace-nowrap ${
        prefersReduced ? '' : 'transition-opacity'
      }`}
      aria-label="Order countdown for same-day shipping"
      title="Order by 2:00 PM for same-day shipping"
    >
      Order within <strong>{formatRemaining(remaining)}</strong> for same‑day shipping
    </span>
  )
}
