/** 
 * SkipLink.tsx
 * Visible-on-focus “Skip to content” link for keyboard users.
 * Jumps to #main-content, which exists on Home and should exist on other pages.
 */

import React from 'react'

/** SkipLink - a11y helper to jump to the main content. */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-neutral-900 focus:shadow-lg focus:outline-none dark:focus:bg-neutral-900 dark:focus:text-neutral-100"
    >
      Skip to content
    </a>
  )
}
