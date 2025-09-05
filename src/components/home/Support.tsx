/**
 * Support - Customer Service & Support section listing key help topics and contact email.
 * Styled to match brand colors with a green CTA.
 */

import { CreditCard, Info, Mail, Package, RefreshCw, Truck } from 'lucide-react'

/** Customer Service & Support with topic cards and a contact CTA. */
export default function Support() {
  const topics = [
    { icon: Package, title: 'Order status & tracking', desc: 'Get updates on your order and tracking details.' },
    { icon: Info, title: 'Product info & recommendations', desc: 'Ask about specs, sizing, and trail-ready picks.' },
    { icon: RefreshCw, title: 'Returns, exchanges & warranty', desc: 'Hassle-free returns and warranty guidance.' },
    { icon: Truck, title: 'Shipping & delivery', desc: 'Timelines, carriers, and delivery questions.' },
    { icon: CreditCard, title: 'Account & payment', desc: 'Login, billing, and payment assistance.' },
  ]

  return (
    <section id="support" className="bg-[#F4E7C8] py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-[#1F3D2B]">Customer Service &amp; Support</h2>
          <p className="mt-1 text-sm text-[#2D3A2D]">
            We&apos;re here to help 7 days a week. Choose a topic below or email us directly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-[#E6D8B8] bg-white p-5">
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

        <div className="mt-6 rounded-2xl border border-[#E6D8B8] bg-white p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#2F5D3A] p-2">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-neutral-900">Email support</p>
                <a href="mailto:info@highcountrygear.shop" className="text-sm text-[#2D3A2D] hover:underline">
                  info@highcountrygear.shop
                </a>
              </div>
            </div>
            <div>
              <a
                href="mailto:info@highcountrygear.shop"
                className="inline-flex items-center rounded-lg bg-[#2F5D3A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#254D30]"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
