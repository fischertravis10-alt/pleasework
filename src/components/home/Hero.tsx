/**
 * Hero.tsx
 * Clean, photographic hero with strong contrast and lean HTML/CSS.
 * - No legacy logo asset; keeps brand focus on content and value props.
 * - Clear CTAs to categories and bundle builder.
 * - LCP optimization: high fetch priority on main image.
 */

import { getFreeShippingThreshold } from '../../utils/pricing'

/** Hero - Responsive banner with background image and overlay copy. */
export default function Hero() {
  return (
    <section className="relative isolate">
      {/* Background image (smart placeholder) */}
      <div className="absolute inset-0 -z-10">
        <img
          src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/8b901e9d-d9ec-47c0-8bd3-54d9e71dcf5e.jpg"
          className="h-full w-full object-cover"
          alt="Alpine trail at sunrise"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          sizes="100vw"
          width={2400}
          height={1600}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/55" />
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:py-20">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
            Trail‑tested gear for the Rockies and beyond
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-neutral-100 md:text-base">
            Automatic bundle pricing at checkout, free shipping over ${getFreeShippingThreshold()}, and a first‑order code <strong>TRAIL10</strong>.
            Headlamps, bottles, cookware, knives, multi‑tools, and trail‑ready apparel—curated in Denver.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#categories"
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 shadow hover:bg-neutral-100"
            >
              Shop categories
            </a>
            <a
              href="#bundle"
              className="rounded-lg border border-white/80 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Bundle & Save
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
