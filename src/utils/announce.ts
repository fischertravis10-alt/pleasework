/**
 * announce.ts
 * Utility to announce messages to assistive technologies via a single polite live region.
 * Dispatches a 'sr-announce' CustomEvent consumed by SRLiveRegion.
 */

/**
 * announce - Emits a polite screen-reader announcement.
 * @param message Text to be announced.
 */
export function announce(message: string) {
  try {
    const evt = new CustomEvent('sr-announce', { detail: { message } })
    window.dispatchEvent(evt)
  } catch {
    // Fallback: directly write to the live region if available.
    const el = document.getElementById('sr-live-region')
    if (el) {
      el.textContent = message
      // Clear after a short delay to allow repetition.
      window.setTimeout(() => {
        if (el.textContent === message) el.textContent = ''
      }, 2500)
    }
  }
}
