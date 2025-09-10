import { HashRouter, Route, Routes } from 'react-router'
import HomePage from './pages/Home'
import Favicon from './components/common/Favicon'
import { Toaster } from 'sonner'
import SkipLink from './components/common/SkipLink'
import StructuredData from './components/common/StructuredData'
import StructuredDataExtras from './components/common/StructuredDataExtras'
import SEO from './components/common/SEO'
import StickyCheckout from './components/common/StickyCheckout'
import WelcomeOfferDialog from './components/common/WelcomeOfferDialog'
import ThemeProvider from './components/common/ThemeProvider'
import Preconnect from './components/common/Preconnect'
import SRLiveRegion from './components/common/SRLiveRegion'
import HashFocusHandler from './components/common/HashFocusHandler'
import ErrorBoundary from './components/common/ErrorBoundary'
import OfflineNotice from './components/common/OfflineNotice'
import DesignVariant from './components/common/DesignVariant'
import OnionSkin from './components/dev/OnionSkin'
import BackToTop from './components/common/BackToTop'
import './styles/scroll.css'
import './styles/global.css'
import './styles/a11y.css'
import './styles/anchors.css'
import I18nProvider from './i18n/I18nProvider'

/**
 * App.tsx
 * Root router. Mounts favicon, accessibility helpers, SEO/structured data,
 * global toast portal, and page routes. Also includes mobile checkout CTA and welcome offer.
 * Enhancements:
 * - DesignVariant: applies data-design attribute (v73 default, v83 toggle via ?design=).
 * - OnionSkin: dev compare overlay (enable via ?compare=1).
 */
export default function App() {
  return (
    <I18nProvider>
      <ThemeProvider>
        {/* Design variant manager (no UI) */}
        <DesignVariant />

        <HashRouter>
        {/* Accessibility: skip to content */}
        <SkipLink />

        {/* Inject favicon and touch icon */}
        <Favicon />

        {/* Performance: preconnect to image/CDN origins */}
        <Preconnect />

        {/* SEO: metadata and structured data */}
        <SEO />
        <StructuredData />
        <StructuredDataExtras />

        {/* Global toast portal */}
        <Toaster richColors closeButton position="top-center" />
        {/* Screen reader live region for a11y announcements */}
        <SRLiveRegion />
        <HashFocusHandler />
        <OfflineNotice />

        <Routes>
          <Route
            path="/"
            element={
              <ErrorBoundary>
                <HomePage />
              </ErrorBoundary>
            }
          />
        </Routes>

        {/* Back to top (floating) */}
        <BackToTop />

        {/* Mobile sticky checkout CTA */}
        <StickyCheckout />

        {/* Welcome offer modal (once per user) */}
        <WelcomeOfferDialog />
      </HashRouter>

        {/* Dev compare overlay (open via ?compare=1) */}
        <OnionSkin />
      </ThemeProvider>
    </I18nProvider>
  )
}
