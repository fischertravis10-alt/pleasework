/**
 * Testimonials - Social proof cards from customers with star ratings and avatars.
 */

import { Star } from 'lucide-react'

interface Testimonial {
  /** Customer name */
  name: string
  /** Location or descriptor */
  location: string
  /** Quote text */
  quote: string
  /** Star rating out of 5 (integer) */
  rating: number
  /** Avatar image source (smart placeholder) */
  src: string
}

/**
 * Renders stars for the given rating.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i <= rating ? 'text-amber-500' : 'text-neutral-300'}`}
          // Fill only for active stars to increase visual clarity
          fill={i <= rating ? 'currentColor' : 'none'}
        />
      ))}
    </div>
  )
}

/**
 * Compact testimonial cards with avatars and quotes.
 */
export default function Testimonials() {
  const items: Testimonial[] = [
    {
      name: 'Avery P.',
      location: 'Boulder, CO',
      quote: 'Fast shipping and solid gear picks. The headlamp recommendation was spot on for alpine starts.',
      rating: 5,
      src: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/17996f28-1771-4d67-a201-fd6fa65a14e3.jpg',
    },
    {
      name: 'Jordan R.',
      location: 'Golden, CO',
      quote: 'Loved the cookware set—lightweight and durable. Great customer service answering sizing questions.',
      rating: 5,
      src: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/e4003316-f910-406a-854f-6db01e8dbc4f.jpg',
    },
    {
      name: 'Sasha M.',
      location: 'Denver, CO',
      quote: 'Quality products and easy returns. I’ll be back for winter base layers.',
      rating: 4,
      src: 'https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/08272fab-f91b-45ba-8280-21e06b6645bc.jpg',
    },
  ]

  return (
    <section aria-label="Testimonials" className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-900">What customers say</h2>
          <p className="mt-1 text-sm text-neutral-700">
            Real feedback from Colorado outdoor enthusiasts.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {items.map((t) => (
            <article
              key={t.name}
              className="rounded-xl border border-neutral-200 bg-white p-5"
              aria-label={`Testimonial by ${t.name}`}
            >
              <div className="flex items-center gap-3">
                <img src={t.src} className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                  <p className="text-xs text-neutral-600">{t.location}</p>
                </div>
              </div>
              <div className="mt-3">
                <Stars rating={t.rating} />
              </div>
              <p className="mt-3 text-sm text-neutral-700">&ldquo;{t.quote}&rdquo;</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
