/** 
 * Support.tsx
 * Help and support block with contact options.
 * - Static content (no mapping) to avoid runtime risks.
 */

import { Headphones, Mail, MessageSquare, Phone } from 'lucide-react'

/** Support - Contact options and hours. */
export default function Support() {
  return (
    <section aria-label="Support">
      <div className="rounded-2xl border border-[#E6D8B8] bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-[#2F5D3A] p-2">
            <Headphones className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-base font-bold text-neutral-900 dark:text-neutral-100">We're here to help</h2>
        </div>
        <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
          Talk to gear specialists for sizing, fit, and trip advice. Fast, friendly, and local.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <a href="tel:+13035551234" className="flex items-center gap-2 rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800">
            <Phone className="h-4 w-4 text-[#2F5D3A]" />
            <span className="text-sm font-semibold text-neutral-900">Call (303) 555-1234</span>
          </a>
          <a href="mailto:support@highcountrygear.example" className="flex items-center gap-2 rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800">
            <Mail className="h-4 w-4 text-[#2F5D3A]" />
            <span className="text-sm font-semibold text-neutral-900">Email Support</span>
          </a>
          <a href="#chat" className="flex items-center gap-2 rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-800">
            <MessageSquare className="h-4 w-4 text-[#2F5D3A]" />
            <span className="text-sm font-semibold text-neutral-900">Live Chat</span>
          </a>
          <div className="rounded-lg border border-neutral-200 p-3 dark:border-neutral-800 dark:bg-neutral-900">
            <p className="text-[11px] text-neutral-700 dark:text-neutral-300">
              Hours: Mon–Fri 9am–6pm MT • Sat 10am–4pm
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
