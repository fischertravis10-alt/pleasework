/** 
 * BackToTop.tsx
 * Floating "back to top" button that appears after scrolling.
 * - Respects reduced motion preference.
 * - Accessible label, keyboard focusable, high-contrast styling.
 */

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

/** Check if the user prefers reduced motion. */
function prefersReducedMotion() {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/** BackToTop - shows a floating button to scroll back to top after some scroll. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /** Scroll to the top with smooth behavior unless reduced motion is preferred. */
  function handleClick() {
    const smooth = !prefersReducedMotion()
    try {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
    } catch {
      window.scrollTo(0, 0)
    }
  }

  return (
    <div
      aria-hidden={!visible}
      className={`fixed bottom-20 right-4 z-[60] transition-opacity ${visible ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
    >
      <button
        type="button"
        onClick={handleClick}
        aria-label="Back to top"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#2F5D3A] text-white shadow-lg ring-1 ring-black/10 hover:bg-[#254D30] focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </div>
  )
}
