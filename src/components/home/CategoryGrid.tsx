/**
 * CategoryGrid - Displays product categories as visual entrance cards.
 */

import type { Category } from '../../data/catalog'

interface CategoryGridProps {
  /** List of categories to display */
  categories: Category[]
}

/**
 * Clickable category cards with consistent aspect and rounded corners.
 */
export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-6 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-neutral-900">Shop by Category</h2>
          <p className="text-sm text-neutral-700">Find the right gear for your mission.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <a
            key={cat.id}
            href={`#${cat.id}`}
            className="group relative overflow-hidden rounded-xl border border-neutral-200 bg-white"
            aria-label={`View ${cat.name}`}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent p-3">
              <span className="text-sm font-semibold text-white">{cat.name}</span>
              <span className="text-[10px] uppercase tracking-wide text-white/90">Shop</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
