/**
 * Brand.tsx
 * Reusable branded logo + wordmark for highcountrygear.shop.
 * Uses provided logo image and links to the home route.
 */

import { Link } from 'react-router'

/** Props for Brand components */
interface BrandProps {
  /** Optional: size of the logo square in pixels */
  size?: number
  /** Optional: show text wordmark next to the logo */
  showText?: boolean
  /** Optional: className for wrapper */
  className?: string
}

/**
 * Brand - Site logo with optional text wordmark.
 * Keeps brand consistent across Header/Footer and other placements.
 */
export default function Brand({ size = 32, showText = true, className = '' }: BrandProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#2F5D3A] ${className}`}
      aria-label="highcountrygear.shop home"
    >
      {/* Logo image from provided asset */}
      <img
        src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/c9e4227f-2b58-4a11-9357-cbe42818e254.png"
        alt="High Country Gear mountain and trees logo"
        width={size}
        height={size}
        className="rounded-md object-contain"
      />
      {showText && (
        <span className="text-base font-black tracking-tight text-[#1B1B1B]">
          highcountrygear.shop
        </span>
      )}
    </Link>
  )
}
