/**
 * FAQ.tsx
 * Accessible FAQ section using native details/summary disclosures.
 * - Small, dependency-free, keyboard and screen-reader friendly.
 * - Uses shared data from src/data/faq.ts to keep JSON-LD in sync.
 */

import { faqItems } from '../../data/faq'

/**
 * FAQ - Frequently Asked Questions with minimal styling and strong contrast.
 */
export default function FAQ() {
  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="text-2xl font-bold tracking-tight text-[#1F3D2B] dark:text-neutral-50">
        Frequently asked questions
      </h2>
      <p className="mt-2 text-sm text-[#2D3A2D] dark:text-neutral-300">
        Answers to shipping, returns, bundles, and sizing—updated regularly.
      </p>

      <div className="mt-6 divide-y divide-[#E6D8B8] rounded-lg border border-[#E6D8B8] bg-white/80 dark:divide-neutral-800 dark:border-neutral-800 dark:bg-neutral-950/60">
        {faqItems.map((item, idx) => (
          <details
            key={idx}
            className="group"
            aria-label={`FAQ item: ${item.question}`}
          >
            <summary className="cursor-pointer list-none px-4 py-4 outline-none transition-colors hover:bg-[#FBF7ED] focus:bg-[#FBF7ED] dark:hover:bg-neutral-900 dark:focus:bg-neutral-900">
              <span className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-[#1F3D2B] dark:text-neutral-100">
                  {item.question}
                </span>
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border border-[#2F5D3A]/30 text-[#2F5D3A] transition-transform group-open:rotate-45 dark:border-neutral-700 dark:text-neutral-200"
                  title="Toggle"
                >
                  +
                </span>
              </span>
            </summary>
            <div className="px-4 pb-4 pt-1 text-sm text-[#2D3A2D] dark:text-neutral-300">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
