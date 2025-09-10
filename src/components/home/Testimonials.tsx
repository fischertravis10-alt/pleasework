/** 
 * Testimonials.tsx
 * Light social proof section with compact quotes.
 * - Uses an internal static list to avoid undefined data sources.
 */

import { Star } from 'lucide-react'

interface Testimonial {
  name: string
  quote: string
  rating: number
  location?: string
}

/** Testimonials - Compact 3-up grid for social proof. */
export default function Testimonials() {
  const items: Testimonial[] = [
    {
      name: 'Maya R.',
      quote: 'Fast shipping and killer quality. My headlamp survived a hailstorm near Breck.',
      rating: 5,
      location: 'Boulder, CO',
    },
    {
      name: 'Luis P.',
      quote: 'Bundle savings stacked with first-order code—great value for solid gear.',
      rating: 5,
      location: 'Denver, CO',
    },
    {
      name: 'Iris K.',
      quote: 'Support actually knows gear. Got spot-on advice for a multi-day trek.',
      rating: 5,
      location: 'Fort Collins, CO',
    },
  ]

  return (
    <section aria-label="Customer testimonials">
      <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">What customers say</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {items.map((t) => (
          <figure
            key={t.name}
            className="rounded-xl border border-[#E6D8B8] bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
          >
            <div className="flex items-center gap-1" aria-label={`${t.rating} out of 5`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-neutral-300 dark:text-neutral-700'}`}
                />
              ))}
            </div>
            <blockquote className="mt-2 text-sm text-neutral-800 dark:text-neutral-200">“{t.quote}”</blockquote>
            <figcaption className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
              — {t.name}
              {t.location ? ` • ${t.location}` : ''}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
