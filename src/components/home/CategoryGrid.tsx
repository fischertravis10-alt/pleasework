/**
 * CategoryGrid.tsx
 * Responsive grid of product categories with mobile-first image optimization.
 * - Uses async image decoding + responsive sizes to reduce LCP on mobile.
 * - High-contrast overlays for readability over photos.
 * - Prevents accidental drag on mobile.
 * - Dark mode and ImageWithSkeleton for smoother perceived loading.
 * Note: Anchor id is provided by the parent SectionAnchor to avoid duplicate IDs.
 */

import { categories } from '../../data/catalog'
import ImageWithSkeleton from '../common/ImageWithSkeleton'
import { track } from '../../utils/analytics'

/**
 * CategoryTile
 * Displays a single category tile with image and overlay label.
 */
function CategoryTile({
  id,
  name,
  image,
}: {
  id: string
  name: string
  image: string
}) {
  return (
    <a
      href="#featured"
      className="group relative overflow-hidden rounded-xl border border-[#E6D8B8] bg-white dark:border-neutral-800 dark:bg-neutral-900"
      aria-label={`Shop ${name}`}
      onClick={() => {
        try {
          track('category_click', { id, name })
        } catch {}
      }}
    >
      <div className="relative aspect-[4/3] w-full">
        <ImageWithSkeleton
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          draggable={false}
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 260px, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={1200}
          height={900}
          containerClassName="h-full w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between">
          <h3 className="text-base font-semibold text-white drop-shadow">{name}</h3>
          <span className="rounded-full bg-white/90 px-2 py-1 text-[11px] font-semibold text-[#2F5D3A] shadow-sm dark:bg-neutral-900/90 dark:text-neutral-100">
            Shop
          </span>
        </div>
      </div>
    </a>
  )
}

/**
 * CategoryGrid
 * 2 to 4 columns responsive layout driven by catalog.ts.
 * Anchor ID is applied by the parent wrapper for consistent spacing and scroll offset.
 */
export default function CategoryGrid() {
  return (
    <section aria-label="Shop by category">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">Shop by category</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300">Explore our best-sellers</p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((c) => (
          <CategoryTile key={c.id} id={c.id} name={c.name} image={c.image} />
        ))}
      </div>
    </section>
  )
}
