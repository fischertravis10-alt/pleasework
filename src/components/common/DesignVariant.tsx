/**
 * DesignVariant.tsx
 * Applies a design-variant attribute to the HTML element based on URL or persisted preference.
 * - Supports HashRouter URLs (e.g., #/?design=v73).
 * - Persists in localStorage (key: hcg-design).
 * - Defaults to 'v73' to keep the current look as the baseline.
 */

import { useEffect } from 'react'

/** Allowed design variants. Extend if needed. */
type DesignId = 'v73' | 'v83'

const KEY = 'hcg-design'

/** Safely get search params in both standard and hash URLs. */
function getAllParams(): URLSearchParams {
  try {
    const params = new URLSearchParams(window.location.search)
    if (window.location.hash.includes('?')) {
      const afterQ = window.location.hash.split('?')[1]
      if (afterQ) {
        const hashParams = new URLSearchParams(afterQ)
        hashParams.forEach((v, k) => {
          if (!params.has(k)) params.set(k, v)
        })
      }
    }
    return params
  } catch {
    return new URLSearchParams()
  }
}

/** Resolve the design variant from URL or storage. Defaults to v73. */
function resolveDesign(): DesignId {
  const params = getAllParams()
  const q = params.get('design') as DesignId | null
  if (q === 'v73' || q === 'v83') {
    try {
      localStorage.setItem(KEY, q)
    } catch {
      // ignore
    }
    return q
  }
  try {
    const saved = localStorage.getItem(KEY) as DesignId | null
    if (saved === 'v73' || saved === 'v83') return saved
  } catch {
    // ignore
  }
  return 'v73'
}

/**
 * DesignVariant - Attaches data-design="v73|v83" on <html>.
 * Consumers can write CSS overrides using [data-design="v83"] selectors if desired.
 */
export default function DesignVariant() {
  useEffect(() => {
    const html = document.documentElement
    function apply() {
      const d = resolveDesign()
      html.setAttribute('data-design', d)
    }
    apply()

    // Update if navigation occurs that changes query/hash.
    const onHash = () => apply()
    const onPop = () => apply()
    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onPop)
    }
  }, [])

  return null
}
