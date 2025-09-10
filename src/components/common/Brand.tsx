/**
 * Brand.tsx
 * Site-wide brand component that now renders the new animated banner logo.
 * - Preserves the original API (size, showText, className) for compatibility.
 * - Ignores showText on purpose so only the new banner appears, as requested.
 */

import LogoAnimated from './LogoAnimated'

/** Props for Brand component (kept for compatibility) */
interface BrandProps {
  /** Height of the banner in px (previously badge size) */
  size?: number
  /** Kept for compatibility but ignored; we always show only the banner */
  showText?: boolean
  /** Optional wrapper className passed to the logo component */
  className?: string
  /** No longer needed: zoom/crop props removed from usage but kept for compatibility */
  zoom?: number
  focusY?: number
}

/**
 * Brand - Renders the new animated banner logo so brand usage is consistent across the site.
 */
export default function Brand({
  size = 32,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  showText = true,
  className = '',
}: BrandProps) {
  return (
    <LogoAnimated
      height={size}
      className={className}
      // src kept for API compatibility, not used by LogoAnimated anymore
      src=""
      ariaLabel="highcountrygear.shop home"
    />
  )
}
