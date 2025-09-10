/**
 * OnionSkin.tsx
 * Developer-only overlay to compare current UI with a reference image (e.g., v73 screenshot).
 * - Activate via ?compare=1 (supports HashRouter).
 * - Paste an image URL, adjust opacity (0-100), toggle fit (cover/contain), and offset (x/y).
 * - Persists settings in localStorage; shows a small "Compare" button after first use.
 * - Overlay image never intercepts pointer events; control panel does.
 */

import { useEffect, useMemo, useState } from 'react'
import { Eye, EyeOff, Image as ImageIcon, Move, RefreshCw, SlidersHorizontal, X } from 'lucide-react'

/** LocalStorage keys for persistence. */
const KEY_ENABLED = 'hcg-compare-enabled'
const KEY_IMAGE = 'hcg-compare-image'
const KEY_OPACITY = 'hcg-compare-opacity'
const KEY_FIT = 'hcg-compare-fit'
const KEY_OFFSET_X = 'hcg-compare-offset-x'
const KEY_OFFSET_Y = 'hcg-compare-offset-y'
const KEY_SEEN = 'hcg-compare-seen'

/** Returns combined URLSearchParams from standard and hash URLs (HashRouter support). */
function getAllParams(): URLSearchParams {
  try {
    const params = new URLSearchParams(window.location.search)
    if (window.location.hash.includes('?')) {
      const afterQ = window.location.hash.split('?')[1]
      if (afterQ) {
        const hashParams = new URLSearchParams(afterQ)
        hashParams.forEach((v, k) => {
          if (!params.has(k)) params.set(k, v)
        })
      }
    }
    return params
  } catch {
    return new URLSearchParams()
  }
}

/**
 * OnionSkin - dev overlay for visual comparison.
 * Usage:
 *  - Enable via `?compare=1` or previously persisted state.
 *  - Paste an image URL (e.g., hosted v73 screenshot) into the input.
 *  - Adjust opacity, fit, and offset to align UI.
 */
export default function OnionSkin() {
  // Determine initial enabled state from URL or localStorage.
  const initialEnabled = useMemo(() => {
    const params = getAllParams()
    const q = params.get('compare')
    if (q === '1') return true
    try {
      return localStorage.getItem(KEY_ENABLED) === '1'
    } catch {
      return false
    }
  }, [])

  const [enabled, setEnabled] = useState<boolean>(initialEnabled)
  const [panelOpen, setPanelOpen] = useState<boolean>(initialEnabled)
  const [imageUrl, setImageUrl] = useState<string>(() => {
    try {
      return localStorage.getItem(KEY_IMAGE) || ''
    } catch {
      return ''
    }
  })
  const [opacity, setOpacity] = useState<number>(() => {
    try {
      const v = parseInt(localStorage.getItem(KEY_OPACITY) || '40', 10)
      return Number.isFinite(v) ? Math.min(100, Math.max(0, v)) : 40
    } catch {
      return 40
    }
  })
  const [fit, setFit] = useState<'cover' | 'contain'>(() => {
    try {
      const v = localStorage.getItem(KEY_FIT)
      return v === 'contain' || v === 'cover' ? v : 'cover'
    } catch {
      return 'cover'
    }
  })
  const [offsetX, setOffsetX] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(KEY_OFFSET_X) || '0', 10) || 0
    } catch {
      return 0
    }
  })
  const [offsetY, setOffsetY] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem(KEY_OFFSET_Y) || '0', 10) || 0
    } catch {
      return 0
    }
  })

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(KEY_ENABLED, enabled ? '1' : '0')
      if (enabled) localStorage.setItem(KEY_SEEN, '1')
    } catch {
      // ignore
    }
  }, [enabled])

  useEffect(() => {
    try {
      localStorage.setItem(KEY_IMAGE, imageUrl)
    } catch {
      // ignore
    }
  }, [imageUrl])

  useEffect(() => {
    try {
      localStorage.setItem(KEY_OPACITY, String(opacity))
    } catch {
      // ignore
    }
  }, [opacity])

  useEffect(() => {
    try {
      localStorage.setItem(KEY_FIT, fit)
    } catch {
      // ignore
    }
  }, [fit])

  useEffect(() => {
    try {
      localStorage.setItem(KEY_OFFSET_X, String(offsetX))
    } catch {
      // ignore
    }
  }, [offsetX])

  useEffect(() => {
    try {
      localStorage.setItem(KEY_OFFSET_Y, String(offsetY))
    } catch {
      // ignore
    }
  }, [offsetY])

  // Keyboard nudging for fine alignment when panel is open
  useEffect(() => {
    if (!enabled || !panelOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') setOffsetX((v) => v - (e.shiftKey ? 10 : 1))
      if (e.key === 'ArrowRight') setOffsetX((v) => v + (e.shiftKey ? 10 : 1))
      if (e.key === 'ArrowUp') setOffsetY((v) => v - (e.shiftKey ? 10 : 1))
      if (e.key === 'ArrowDown') setOffsetY((v) => v + (e.shiftKey ? 10 : 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [enabled, panelOpen])

  // Show a small reopen button after first use
  const seenBefore = useMemo(() => {
    try {
      return localStorage.getItem(KEY_SEEN) === '1'
    } catch {
      return false
    }
  }, [])

  if (!enabled && !seenBefore) return null

  // Overlay image (non-interactive)
  const overlay = enabled && imageUrl ? (
    <div
      className="pointer-events-none fixed inset-0 z-[60]"
      aria-hidden
    >
      <img
        src={imageUrl}
        alt=""
        className="h-full w-full select-none"
        style={{
          opacity: Math.max(0, Math.min(1, opacity / 100)),
          objectFit: fit,
          transform: `translate(${offsetX}px, ${offsetY}px)`,
        }}
        draggable={false}
      />
    </div>
  ) : null

  // Control panel UI (interactive)
  const controls = panelOpen ? (
    <div className="fixed bottom-4 left-4 z-[61] max-w-[90vw] rounded-xl border border-neutral-200 bg-white/95 p-3 shadow-xl backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/95">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-neutral-700 dark:text-neutral-200" />
          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-100">Compare overlay</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setEnabled((v) => !v)}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            title={enabled ? 'Hide overlay' : 'Show overlay'}
          >
            {enabled ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            {enabled ? 'Hide' : 'Show'}
          </button>
          <button
            onClick={() => setPanelOpen(false)}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-xs font-medium hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            title="Close panel"
          >
            <X className="h-3.5 w-3.5" /> Close
          </button>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex w-full items-center gap-2 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs dark:border-neutral-800 dark:bg-neutral-900">
          <ImageIcon className="h-4 w-4 text-neutral-500" />
          <input
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Paste reference image URL (e.g., v73 screenshot)"
            className="w-full bg-transparent text-neutral-800 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
          />
        </label>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-600 dark:text-neutral-300">Opacity</span>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => setOpacity(parseInt(e.target.value, 10))}
            className="h-1 w-40 cursor-pointer"
            aria-label="Overlay opacity"
          />
          <span className="w-8 text-right text-xs tabular-nums text-neutral-700 dark:text-neutral-200">{opacity}%</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-600 dark:text-neutral-300">Fit</span>
          <div className="inline-flex overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setFit('cover')}
              className={`px-2 py-1 text-xs ${fit === 'cover' ? 'bg-[#2F5D3A] text-white' : 'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'}`}
            >
              cover
            </button>
            <button
              onClick={() => setFit('contain')}
              className={`px-2 py-1 text-xs ${fit === 'contain' ? 'bg-[#2F5D3A] text-white' : 'bg-white text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200'}`}
            >
              contain
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Move className="h-3.5 w-3.5 text-neutral-500" />
          <span className="text-xs text-neutral-600 dark:text-neutral-300">Offset</span>
          <input
            type="number"
            value={offsetX}
            onChange={(e) => setOffsetX(parseInt(e.target.value || '0', 10))}
            className="w-20 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs dark:border-neutral-800 dark:bg-neutral-900"
            placeholder="x"
            aria-label="Offset X"
          />
          <input
            type="number"
            value={offsetY}
            onChange={(e) => setOffsetY(parseInt(e.target.value || '0', 10))}
            className="w-20 rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs dark:border-neutral-800 dark:bg-neutral-900"
            placeholder="y"
            aria-label="Offset Y"
          />
          <button
            onClick={() => {
              setOffsetX(0)
              setOffsetY(0)
            }}
            className="inline-flex items-center gap-1 rounded-md border border-neutral-200 px-2 py-1 text-xs hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-800"
            title="Reset offsets"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="mt-3 text-[11px] text-neutral-600 dark:text-neutral-400">
        Tips: Use arrow keys to nudge by 1px; hold Shift for 10px.
      </div>
    </div>
  ) : null

  // Reopen button (visible after first use)
  const reopenButton = !panelOpen ? (
    <button
      onClick={() => {
        setPanelOpen(true)
        setEnabled(true)
      }}
      className="fixed bottom-4 left-4 z-[61] rounded-full bg-[#1F3D2B] px-3 py-2 text-xs font-semibold text-white shadow-lg hover:bg-[#254D30]"
      title="Open compare overlay"
    >
      Compare
    </button>
  ) : null

  return (
    <>
      {overlay}
      {controls}
      {!enabled && seenBefore && reopenButton}
    </>
  )
}
