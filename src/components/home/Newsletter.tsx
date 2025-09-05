/**
 * Newsletter - Email capture banner with simple form UX.
 */

import { Mail } from 'lucide-react'
import { useState } from 'react'

/**
 * Lightweight controlled input with success state; replace with real API later.
 */
export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  /**
   * Handle email submission with minimal validation.
   */
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setSent(true)
  }

  return (
    <section id="newsletter" className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl bg-neutral-900 px-6 py-10 text-white">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-bold">Get 10% off your first order</h3>
            <p className="mt-1 text-sm text-neutral-200">
              Join the highcountrygear.shop list for deals, trip tips, and gear drops. Unsubscribe anytime.
            </p>
          </div>
          {!sent ? (
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <label className="sr-only" htmlFor="email">Email address</label>
              <div className="flex overflow-hidden rounded-lg border border-white/20 bg-white/10">
                <div className="flex items-center gap-2 pl-3 text-neutral-200">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="you@example.com"
                  className="flex-1 bg-transparent px-3 py-2 text-sm text-white placeholder:text-neutral-300 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-100"
                >
                  Subscribe
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm font-semibold text-emerald-300">Thanks! Check your inbox to confirm.</p>
          )}
        </div>
      </div>
    </section>
  )
}
