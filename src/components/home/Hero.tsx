/**
 * Hero - Immersive hero section with Colorado scenery and brand-colored CTAs.
 * Palette aligned with logo: forest green primary and mountain red accent (subtle).
 */

import { ArrowRight } from 'lucide-react'

/** Large, accessible hero with gradient overlay for contrast on imagery. */
export default function Hero() {
  return (
    <section aria-label="Hero" className="relative">
      <div className="relative h-[58vh] min-h-[420px] w-full overflow-hidden">
        <img
          src="https://pub-cdn.sider.ai/u/U08XHOG6875/web-coder/68ba4605cac2f2af6f8348bf/resource/5cd4040f-b282-4f78-a30d-0d4e086e7ccc.jpg"
          alt="Rocky Mountains near Denver, Colorado"
          className="h-full w-full object-cover"
        />
        {/* Tinted overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1F3D2B]/70 via-[#1F3D2B]/30 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto mb-10 max-w-7xl px-4">
            <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl">
              Gear up for your next Rockies adventure
            </h1>
            <p className="mt-3 max-w-2xl text-sm text-neutral-100 md:text-base">
              Headlamps, bottles, cookware, knives, multi-tools, and trail-ready apparel—curated in Denver.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-lg bg-[#2F5D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
              >
                Shop Featured
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 rounded-lg border border-white/80 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                Browse Categories
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
