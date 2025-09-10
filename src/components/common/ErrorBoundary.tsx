/**
 * ErrorBoundary.tsx
 * Catches render/runtime errors in child components and shows a friendly fallback UI.
 * Enhanced to act as an excellent landing page when something breaks:
 * - Clear message + actionable CTAs (Reload, Home, Email, Call).
 * - Safe "Popular picks" mini-grid from local catalog data (no heavy dependencies).
 * - High contrast, dark-mode aware, and accessible.
 */

import React from 'react'
import { featuredProducts } from '../../data/catalog'
import { RefreshCcw, Home as HomeIcon, Mail, Phone, ArrowRight } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

/**
 * ErrorBoundary - classic class component boundary for React 18.
 * Shows a helpful message, Reload and Home actions, and a compact safe shopping area.
 */
export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Non-fatal logging (replace with analytics if desired)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('[ErrorBoundary]', error, info)
    }
  }

  /** Reloads the current page. */
  private handleReload = () => {
    window.location.reload()
  }

  /** Navigates to the main route (HashRouter-safe). */
  private handleHome = () => {
    window.location.hash = '/'
  }

  render() {
    if (!this.state.hasError) return this.props.children

    const safePicks = (Array.isArray(featuredProducts) ? featuredProducts : []).slice(0, 4)

    return (
      <div className="relative">
        {/* Soft photographic band to keep it branded without heavy assets */}
        <div className="absolute inset-0 -z-10">
          <img
            src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/edc556ec-78b0-479b-b0c7-dc016b24bc04.jpg"
            className="h-full w-full object-cover"
            alt=""
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white dark:to-neutral-950" />
        </div>

        <div className="mx-auto max-w-3xl px-4 py-14">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            We hit a bump in the trail
          </h1>
          <p className="mt-3 text-sm text-neutral-100">
            Something went wrong while loading this page. You can reload, go back home, or contact support—your cart is safe.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={this.handleReload}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
            >
              <RefreshCcw className="h-4 w-4" />
              Reload
            </button>
            <button
              onClick={this.handleHome}
              className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-black/10 backdrop-blur hover:bg-white"
            >
              <HomeIcon className="h-4 w-4" />
              Go Home
            </button>
            <a
              href="mailto:support@highcountrygear.example"
              className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-black/10 backdrop-blur hover:bg-white"
            >
              <Mail className="h-4 w-4" />
              Email support
            </a>
            <a
              href="tel:+13035551234"
              className="inline-flex items-center gap-2 rounded-lg bg-white/95 px-4 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-black/10 backdrop-blur hover:bg-white"
            >
              <Phone className="h-4 w-4" />
              Call (303) 555-1234
            </a>
          </div>

          {/* Safe mini-grid so users can keep shopping even if the main page failed */}
          {safePicks.length > 0 && (
            <div className="mt-10 rounded-2xl border border-white/20 bg-white/90 p-4 shadow-sm backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/90">
              <div className="mb-3 flex items-end justify-between">
                <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">Popular picks</h2>
                <a
                  href="#featured"
                  className="text-xs font-semibold text-[#2F5D3A] hover:underline"
                  aria-label="View featured products"
                >
                  View all <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
                </a>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {safePicks.map((p) => (
                  <a
                    key={p.id}
                    href="#featured"
                    className="group overflow-hidden rounded-lg border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
                    aria-label={`Shop ${p.name}`}
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        width={800}
                        height={600}
                      />
                    </div>
                    <div className="p-2">
                      <p className="truncate text-xs font-semibold text-neutral-900 dark:text-neutral-100" title={p.name}>
                        {p.name}
                      </p>
                      <p className="text-xs font-semibold text-[#2F5D3A]">${p.price.toFixed(2)}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Developer-only details to aid debugging without scaring users in production */}
          {process.env.NODE_ENV !== 'production' && this.state.error && (
            <details className="mt-8 rounded-lg bg-neutral-900/90 p-4 text-xs text-neutral-100">
              <summary className="cursor-pointer font-semibold">Error details (dev only)</summary>
              <pre className="mt-2 overflow-auto whitespace-pre-wrap">{String(this.state.error?.message || this.state.error)}</pre>
            </details>
          )}
        </div>
      </div>
    )
  }
}
