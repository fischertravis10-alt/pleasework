/**
 * HashFocusHandler.tsx
 * Listens to hash changes and moves focus to the target section for better accessibility.
 * Announces focus changes via SR live region helper.
 */

import { useEffect } from 'react'
import { announce } from '../../utils/announce'

/** Focuses the element that matches the current hash (if present and focusable). */
function focusHashTarget() {
  const id = (window.location.hash || '').replace(/^#/, '')
  if (!id) return
  const el = document.getElementById(id)
  if (!el) return

  // Make temporarily focusable if needed
  const prevTabIndex = (el as HTMLElement).getAttribute('tabindex')
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1')
  }

  ;(el as HTMLElement).focus({ preventScroll: true })
  el.scrollIntoView({ block: 'start', behavior: 'smooth' })

  // SR announcement
  const name =
    el.getAttribute('aria-label') ||
    el.getAttribute('data-section-title') ||
    id
  announce(`Jumped to section: ${name}`)

  // Cleanup tabindex if it didn't exist before
  if (prevTabIndex === null) {
    el.removeAttribute('tabindex')
  }
}

/**
 * HashFocusHandler
 * Mount-only utility component; subscribes to hashchange and on-load focus.
 */
export default function HashFocusHandler() {
  useEffect(() => {
    // On initial load (if hash present)
    focusHashTarget()
    // On subsequent hash changes
    const handler = () => focusHashTarget()
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return null
}
