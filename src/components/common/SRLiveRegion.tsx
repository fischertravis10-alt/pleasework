/**
 * SRLiveRegion.tsx
 * Visually hidden polite live region to announce important UI events (e.g., add-to-cart).
 * Listens for a global 'sr-announce' CustomEvent and reads the message for assistive tech.
 */

import { useEffect, useRef, useState } from 'react'

/**
 * SRLiveRegion - mounts a hidden aria-live=polite region and updates it on 'sr-announce' events.
 */
export default function SRLiveRegion() {
  const [msg, setMsg] = useState('')
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    function onAnnounce(e: Event) {
      const ce = e as CustomEvent<{ message?: string }>
      const next = ce.detail?.message ?? ''
      setMsg(next)
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
      timerRef.current = window.setTimeout(() => setMsg(''), 2500)
    }
    window.addEventListener('sr-announce' as unknown as string, onAnnounce)
    return () => {
      window.removeEventListener('sr-announce' as unknown as string, onAnnounce)
      if (timerRef.current) window.clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div
      id="sr-live-region"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {msg}
    </div>
  )
}
