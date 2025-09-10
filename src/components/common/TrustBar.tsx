/**
 * TrustBar.tsx
 * Subtle trust indicators shown below the main header nav.
 * - SSL secure checkout, free returns, and carbon neutrality.
 * - Improves perceived safety and reliability.
 */

import { Lock, ShieldCheck, Leaf } from 'lucide-react'

/** Trust badges row under the header. */
export default function TrustBar() {
  const items = [
    { icon: Lock, label: 'SSL secure checkout' },
    { icon: ShieldCheck, label: 'Free 30-day returns' },
    { icon: Leaf, label: 'Carbon neutral shipping' },
  ]

  return (
    <div className="border-t border-[#E6D8B8] bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-2 text-[11px] text-neutral-700 md:text-xs">
        {items.map(({ icon: Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-2">
            <span className="rounded bg-[#2F5D3A]/10 p-1">
              <Icon className="h-3.5 w-3.5 text-[#2F5D3A]" />
            </span>
            <span className="font-medium">{label}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
