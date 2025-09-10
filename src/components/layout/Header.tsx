/**
 * Header.tsx
 * Sticky site header with brand, navigation, and CTAs.
 * Enhanced with Search, Cart actions, shipping countdown, promo bar, and free-shipping pill.
 * - Enhancement: show brand on desktop too; add direct "Bundle" link in the nav.
 */

import { MapPin, Phone, Search as SearchIcon, ShoppingBag, Heart } from 'lucide-react'
import LogoAnimated from '../common/LogoAnimated'
import { useEffect, useMemo, useRef, useState, lazy, Suspense } from 'react'
const CartDrawer = lazy(() => import('../common/CartDrawer'))
const SearchDialog = lazy(() => import('../common/SearchDialog'))
import { useCartStore } from '../../stores/cart'
import { getFreeShippingThreshold } from '../../utils/pricing'
import ShippingCountdown from '../common/ShippingCountdown'
import PromoBar from '../common/PromoBar'
import TrustBar from '../common/TrustBar'
import { formatMoney } from '../../utils/format'
import ThemeToggle from '../common/ThemeToggle'
import { track } from '../../utils/analytics'
import { announce } from '../../utils/announce'

/**
 * Sticky header composed of a dark-green top bar and a light sand main nav.
 * Adds search and cart actions; cart count updates live from the global store.
 */
export default function Header() {
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())
  const items = useCartStore((s) => s.items)
  const subtotal = useMemo(
    () => Object.values(items).reduce((sum, r) => sum + r.product.price * r.qty, 0),
    [items]
  )
  /** Free-shipping threshold + remaining; used by pill and micro progress */
  const threshold = getFreeShippingThreshold()
  const remaining = Math.max(0, threshold - subtotal)
  const progressPct = Math.max(0, Math.min(100, ((threshold - remaining) / Math.max(1, threshold)) * 100))

  // Announce once when free shipping is unlocked (from >0 to 0)
  const unlockedAnnouncedRef = useRef(false)
  useEffect(() => {
    const unlocked = remaining <= 0
    if (unlocked && !unlockedAnnouncedRef.current) {
      unlockedAnnouncedRef.current = true
      try { track('free_shipping_unlocked', { threshold }) } catch {}
      announce('Free shipping unlocked on your order')
    }
    if (!unlocked) {
      // Reset so we can announce again in a new session/order flow
      unlockedAnnouncedRef.current = false
    }
  }, [remaining, threshold])

  // Keyboard: press "/" to open search (classic ecom shortcut)
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey) {
        // avoid typing into inputs
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
        if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) return
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Global event to open cart (from StickyCheckout or other CTAs)
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onOpenCart = () => setCartOpen(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.addEventListener('open-cart' as any, onOpenCart)
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      window.removeEventListener('open-cart' as any, onOpenCart)
    }
  }, [])

  return (
    <header id="page-top" className="sticky top-0 z-40 w-full border-b border-[#E6D8B8] bg-[#F4E7C8]/90 backdrop-blur">
      {/* Promo + announcement bar */}
      <PromoBar />
      <div className="bg-[#1F3D2B] text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs">
          <div className="flex items-center gap-3">
            <MapPin className="h-3.5 w-3.5" />
            <span>Denver, Colorado</span>
            <span className="hidden sm:inline">•</span>
            <span className="inline-flex items-center">
              <ShippingCountdown />
            </span>
          </div>
          <a href="tel:+13035551234" className="flex items-center gap-2 hover:underline">
            <Phone className="h-3.5 w-3.5" />
            <span>(303) 555-1234</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:py-2">
        {/* Brand (mobile + desktop) */}
        <div className="flex items-center">
          <LogoAnimated
          height={48}
          className="md:hidden"
          src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/1f16cfc1-223c-4bbb-96c6-e6cc18ae0813.png"
        />
          <LogoAnimated
          height={80}
          className="hidden md:block"
          src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/1f16cfc1-223c-4bbb-96c6-e6cc18ae0813.png"
        />
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex" aria-label="Primary">
          <a href="#categories" className="text-[#2D3A2D] hover:text-[#1F3D2B]">Shop</a>
          <a href="#bundle" className="text-[#2D3A2D] hover:text-[#1F3D2B]">Bundle</a>
          <a href="#features" className="text-[#2D3A2D] hover:text-[#1F3D2B]">Why Us</a>
          <a href="#support" className="text-[#2D3A2D] hover:text-[#1F3D2B]">Support</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />
          {/* Free shipping pill (keeps goal top-of-mind) */}
          <div
            className={`hidden rounded-full px-3 py-1 text-[11px] md:inline-flex ${
              remaining > 0
                ? 'bg-white text-[#2F5D3A] ring-1 ring-[#2F5D3A]/30 dark:bg-neutral-900 dark:text-neutral-100 dark:ring-neutral-700'
                : 'bg-emerald-600 text-white'
            }`}
            title={
              remaining > 0
                ? `Add ${formatMoney(remaining)} for free shipping`
                : 'Free shipping unlocked'
            }
          >
            {remaining > 0 ? (
              <>Free ship in {formatMoney(remaining)}</>
            ) : (
              <>Free shipping unlocked</>
            )}
          </div>
          {/* Micro progress toward free shipping (desktop only) */}
          <div className="hidden md:flex w-16 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden" aria-label="Free shipping progress">
            <div
              className="h-full bg-[#2F5D3A] dark:bg-emerald-500"
              style={{ width: `${progressPct}%` }}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progressPct)}
              role="progressbar"
            />
          </div>

          <button
            onClick={() => { setSearchOpen(true); try { track('open_search') } catch {} }}
            className="inline-flex items-center gap-2 rounded-lg border border-[#2F5D3A] px-3 py-2 text-sm font-medium text-[#2F5D3A] hover:bg-[#2F5D3A]/10"
            aria-label="Open search"
            aria-expanded={searchOpen}
          >
            <SearchIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Search</span>
          </button>

          <button
            onClick={() => { setCartOpen(true); try { track('open_cart') } catch {} }}
            className="relative inline-flex items-center gap-2 rounded-lg bg-[#2F5D3A] px-3 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
            aria-label="Open cart"
            aria-expanded={cartOpen}
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[#2F5D3A] ring-1 ring-black/5">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Trust bar */}
      <TrustBar />

      {/* Portals (lazy) */}
      <Suspense fallback={null}>
        {cartOpen && <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />}
        {searchOpen && <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />}
      </Suspense>
    </header>
  )
}
