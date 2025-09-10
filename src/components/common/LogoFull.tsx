/**
 * LogoFull.tsx
 * Full brand logo proxy that now renders the animated banner version.
 * - Keeps the same API and returns a link to home via the nested LogoAnimated.
 */

import LogoAnimated from './LogoAnimated'

/** Props for the full logo component (kept for compatibility) */
interface LogoFullProps {
  /** Pixel height of the logo banner (width auto-scales) */
  height?: number
  /** Optional wrapper className */
  className?: string
}

/**
 * LogoFull - Delegates to the animated banner logo to keep the brand consistent.
 */
export default function LogoFull({ height = 84, className = '' }: LogoFullProps) {
  return (
    <LogoAnimated
      height={height}
      className={className}
      // src retained for compatibility with previous versions
      src=""
      ariaLabel="highcountrygear.shop home"
    />
  )
}
