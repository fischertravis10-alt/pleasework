/**
 * Home.tsx
 * Primary landing page composed of modular sections. Provides anchorable sections for
 * navigation and SEO, ensures the home page is never empty, and maintains strong a11y.
 */

import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import PromoBar from '../components/common/PromoBar'
import TrustBar from '../components/common/TrustBar'
import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import BundleBuilder from '../components/bundle/BundleBuilder'
import Features from '../components/home/Features'
import Support from '../components/home/Support'
import FAQ from '../components/home/FAQ'
import Testimonials from '../components/home/Testimonials'
import Newsletter from '../components/home/Newsletter'
import RecentlyViewed from '../components/home/RecentlyViewed'
import SectionAnchor from '../components/common/SectionAnchor'

/**
 * HomePage
 * Assembles a visually rich, conversion-friendly homepage with anchorable sections.
 */
export default function HomePage() {
  return (
    <div className="min-h-dvh bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Top promotional strip */}
      <PromoBar />

      {/* Global header */}
      <Header />

      {/* Hero (immersive, above-the-fold) */}
      <SectionAnchor id="home" ariaLabel="Home" fullBleed className="py-0">
        <Hero />
        <TrustBar />
      </SectionAnchor>

      {/* Featured products */}
      <SectionAnchor id="featured" ariaLabel="Best sellers">
        <FeaturedProducts />
      </SectionAnchor>

      {/* Shop by category */}
      <SectionAnchor id="categories" ariaLabel="Shop by category">
        <CategoryGrid />
      </SectionAnchor>

      {/* Bundle builder (savings-focused) */}
      <SectionAnchor id="bundle" ariaLabel="Bundle and save" fullBleed>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <BundleBuilder />
        </div>
      </SectionAnchor>

      {/* Why shop with us (full-bleed visuals) */}
      <SectionAnchor id="features" ariaLabel="Why shop with us" fullBleed>
        <Features />
      </SectionAnchor>

      {/* Social proof */}
      <SectionAnchor id="testimonials" ariaLabel="Testimonials">
        <Testimonials />
      </SectionAnchor>

      {/* Support / help */}
      <SectionAnchor id="support" ariaLabel="Support">
        <Support />
      </SectionAnchor>

      {/* FAQ */}
      <SectionAnchor id="faq" ariaLabel="Frequently asked questions">
        <FAQ />
      </SectionAnchor>

      {/* Newsletter capture */}
      <SectionAnchor id="newsletter" ariaLabel="Newsletter signup">
        <Newsletter />
      </SectionAnchor>

      {/* Personalized: Recently viewed (internally handles empty state) */}
      <SectionAnchor id="recent" ariaLabel="Recently viewed">
        <RecentlyViewed />
      </SectionAnchor>

      {/* Footer */}
      <Footer />
    </div>
  )
}
