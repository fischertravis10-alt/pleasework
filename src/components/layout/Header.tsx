/**
 * Header - Sticky site header with brand, navigation, and CTAs.
 * Updated to align with the High Country Gear logo colors and include the logo.
 */

import { Link } from 'react-router'
import { MapPin, Phone } from 'lucide-react'
import Brand from '../common/Brand'

/**
 * Sticky header composed of a dark-green top bar and a light sand main nav.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E6D8B8] bg-[#F4E7C8]/90 backdrop-blur">
      {/* Top announcement bar */}
      <div className="bg-[#1F3D2B] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <span>Denver, Colorado — Same-day shipping before 2pm MT</span>
          </div>
          <a href="tel:+13035551234" className="flex items-center gap-2 hover:underline">
            <Phone className="h-3.5 w-3.5" />
            <span>(303) 555-1234</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Brand size={28} showText className="" />
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="#categories" className="text-[#2D3A2D] hover:text-[#1F3D2B]">
            Shop
          </a>
          <a href="#features" className="text-[#2D3A2D] hover:text-[#1F3D2B]">
            Why Us
          </a>
          <a href="#support" className="text-[#2D3A2D] hover:text-[#1F3D2B]">
            Support
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="#newsletter"
            className="rounded-lg border border-[#2F5D3A] px-3 py-2 text-sm font-medium text-[#2F5D3A] hover:bg-[#2F5D3A]/10"
          >
            Newsletter
          </a>
          <a
            href="#featured"
            className="rounded-lg bg-[#2F5D3A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
          >
            Browse Gear
          </a>
        </div>
      </div>
    </header>
  )
}
