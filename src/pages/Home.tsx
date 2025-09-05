/**
 * Home - Landing experience for highcountrygear.shop (Denver-based outdoor e-commerce).
 * Composes hero, categories, features, featured products, testimonials, support, newsletter, and footer.
 */

import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import Hero from '../components/home/Hero'
import CategoryGrid from '../components/home/CategoryGrid'
import Features from '../components/home/Features'
import FeaturedProducts from '../components/home/FeaturedProducts'
import Newsletter from '../components/home/Newsletter'
import Testimonials from '../components/home/Testimonials'
import Support from '../components/home/Support'
import { categories } from '../data/catalog'

/**
 * Main home page organized with clear sections for discoverability and conversions.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <Hero />
        <CategoryGrid categories={categories} />
        <Features />
        <FeaturedProducts />
        <Testimonials />
        <Support />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}
