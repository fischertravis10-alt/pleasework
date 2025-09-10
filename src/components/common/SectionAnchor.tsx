/**
 * SectionAnchor.tsx
 * A11y-friendly section wrapper that creates an anchorable region with consistent spacing,
 * optional full-bleed layout, and scroll offset via CSS. Helps avoid duplicate IDs.
 */

import React from 'react'
import clsx from 'clsx'

/**
 * SectionAnchorProps
 * Props for SectionAnchor to render a labeled region with id and layout controls.
 */
interface SectionAnchorProps extends React.HTMLAttributes<HTMLElement> {
  /** Unique anchor id for the section (e.g., "features"). */
  id: string
  /** Optional aria-label, used as region label and focus announcement. */
  ariaLabel?: string
  /** When true, children render full-bleed (no container wrap). */
  fullBleed?: boolean
  /** Optional extra classes for the section element. */
  className?: string
  /** Section content. */
  children: React.ReactNode
}

/**
 * SectionAnchor
 * Wraps content in a semantic landmark with id, ARIA labeling, and scroll-margin handling.
 */
export default function SectionAnchor({
  id,
  ariaLabel,
  fullBleed = false,
  className,
  children,
  ...rest
}: SectionAnchorProps) {
  const sectionClass = clsx(
    'anchor-target',
    // Default vertical rhythm; fine-tune per section via className
    'py-10 sm:py-12',
    className
  )

  const content = fullBleed ? (
    children
  ) : (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
  )

  return (
    <section
      id={id}
      role="region"
      aria-label={ariaLabel || id}
      data-anchor-target
      className={sectionClass}
      {...rest}
    >
      {content}
    </section>
  )
}
