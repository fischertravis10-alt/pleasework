/**
 * OfflineNotice.tsx
 * Fixed, dismissible banner that informs users when they are offline.
 * - Listens to 'online'/'offline' events and toggles visibility.
 * - High contrast, small footprint, and accessible.
 */

import { useEffect, useState } from 'react'
import { WifiOff, X } from 'lucide-react'

/** OfflineNotice - shows a top-right banner when the user is offline. */
export default function OfflineNotice() {
  const [online, setOnline] = useState<boolean>(true)
  const [dismissed, setDismissed] = useState<boolean>(false)

  useEffect(() => {
    function update() {
      setOnline(navigator.onLine)
      if (navigator.onLine) setDismissed(false)
    }
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  if (online || dismissed) return null

  return (
    <div
      className="fixed right-4 top-4 z-50 max-w-xs rounded-lg border border-amber-400 bg-amber-50 px-3 py-2 text-amber-900 shadow-lg dark:border-amber-500/60 dark:bg-[#3a2a00] dark:text-amber-100"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-2">
        <WifiOff className="mt-0.5 h-4 w-4 shrink-0" />
        <div className="text-xs">
          <p className="font-semibold">You&apos;re offline</p>
          <p>We&apos;ll retry when your connection returns.</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-auto inline-flex items-center justify-center rounded p-1 hover:bg-amber-100/60 dark:hover:bg-black/20"
          aria-label="Dismiss offline notice"
          title="Dismiss"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}
