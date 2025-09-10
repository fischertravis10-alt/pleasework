/**
 * FreeShippingProgress.tsx
 * AOV driver: shows progress toward a free-shipping threshold.
 */

import { formatMoney } from '../../utils/format'

interface FreeShippingProgressProps {
  /** Current subtotal value */
  subtotal: number
  /** Threshold for free shipping */
  threshold: number
}

/**
 * FreeShippingProgress - Progress bar + message for free shipping threshold.
 */
export default function FreeShippingProgress({ subtotal, threshold }: FreeShippingProgressProps) {
  const pct = Math.max(0, Math.min(100, (subtotal / threshold) * 100))
  const remaining = Math.max(0, threshold - subtotal)
  const achieved = remaining <= 0

  return (
    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
      <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
        <div
          className={`h-full rounded-full ${achieved ? 'bg-emerald-600' : 'bg-[#2F5D3A]'}`}
          style={{ width: `${pct}%` }}
          aria-label={`Free shipping progress ${Math.round(pct)}%`}
        />
      </div>
      <p className="text-xs text-neutral-800">
        {achieved ? (
          <span className="font-semibold text-emerald-700">You qualify for free shipping!</span>
        ) : (
          <>
            You&apos;re <span className="font-semibold">{formatMoney(remaining)}</span> away from free shipping.
          </>
        )}
      </p>
    </div>
  )
}
