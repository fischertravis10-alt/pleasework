/**
 * Features - Value propositions and trust indicators for the brand.
 * Color-tuned to match the logo palette (green accents).
 */

import { ShieldCheck, Recycle, Truck, Mountain, Headphones } from 'lucide-react'

/** Compact grid of value props with icons and concise copy. */
export default function Features() {
  const items = [
    { icon: Mountain, title: 'Denver-based', desc: 'Trail-tested gear for Rockies conditions.' },
    { icon: Truck, title: 'Fast shipping', desc: 'Same-day dispatch before 2pm MT.' },
    { icon: ShieldCheck, title: '30-day returns', desc: 'Free and easy returns within 30 days.' },
    { icon: Headphones, title: 'Expert support', desc: 'Talk to real outdoor gear specialists.' },
    { icon: Recycle, title: 'Carbon neutral', desc: 'We offset shipping emissions.' },
  ]
  return (
    <section id="features" className="bg-[#F4E7C8] py-12">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-2xl font-bold text-[#1F3D2B]">Why shop with us</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-[#E6D8B8] bg-white p-4">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-[#2F5D3A]/10 p-2">
                  <Icon className="h-5 w-5 text-[#2F5D3A]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900">{title}</p>
                  <p className="text-sm text-neutral-700">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
