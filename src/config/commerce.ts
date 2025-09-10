/**
 * commerce.ts
 * Centralized commerce configuration with A/B variants.
 * - Controls discount ladders, free-shipping threshold, and free-gift threshold.
 * - Variant can be overridden via URL (variant=A|B) and is persisted in localStorage.
 */

export type VariantId = 'A' | 'B'

/** Discount ladder step: rate applies when itemCount >= minItems */
export interface DiscountStep {
  /** Minimum number of items to qualify for this step */
  minItems: number
  /** Discount rate as a decimal (e.g., 0.1 = 10%) */
  rate: number
}

/** Commerce settings for a variant */
export interface CommerceConfig {
  /** Variant identifier */
  id: VariantId
  /** Progressive discount ladder by item count */
  discountLadder: DiscountStep[]
  /** Free shipping threshold in USD */
  freeShippingThreshold: number
  /** Free gift threshold in USD */
  freeGiftThreshold: number
}

/** Variant A: Control */
const VARIANT_A: CommerceConfig = {
  id: 'A',
  discountLadder: [
    { minItems: 2, rate: 0.10 },
    { minItems: 3, rate: 0.15 },
  ],
  freeShippingThreshold: 39,
  freeGiftThreshold: 120,
}

/** Variant B: Alternative test */
const VARIANT_B: CommerceConfig = {
  id: 'B',
  discountLadder: [
    { minItems: 2, rate: 0.05 },
    { minItems: 3, rate: 0.10 },
    { minItems: 4, rate: 0.15 },
  ],
  freeShippingThreshold: 49,
  freeGiftThreshold: 150,
}

const KEY = 'hcg-variant'

/** Safely get search params across hash or standard URLs. */
function getAllParams(): URLSearchParams {
  try {
    const params = new URLSearchParams(window.location.search)
    // HashRouter: allow ?variant= in hash (e.g., #/?variant=A)
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

/** Reads variant override from URL if present and valid. */
function readVariantFromURL(): VariantId | undefined {
  const params = getAllParams()
  const v = params.get('variant')
  if (v === 'A' || v === 'B') return v
  return undefined
}

/** Loads persisted variant from localStorage. */
function readPersistedVariant(): VariantId | undefined {
  try {
    const v = localStorage.getItem(KEY) as VariantId | null
    if (v === 'A' || v === 'B') return v
  } catch {
    // ignore
  }
  return undefined
}

/** Persists the active variant to localStorage. */
function persistVariant(v: VariantId) {
  try {
    localStorage.setItem(KEY, v)
  } catch {
    // ignore
  }
}

/**
 * getActiveVariant - Resolve active variant with precedence:
 * 1) URL override
 * 2) Persisted value
 * 3) Default to 'A' (control)
 */
export function getActiveVariant(): VariantId {
  const fromUrl = readVariantFromURL()
  if (fromUrl) {
    persistVariant(fromUrl)
    return fromUrl
  }
  const persisted = readPersistedVariant()
  if (persisted) return persisted
  persistVariant('A')
  return 'A'
}

/** Returns config for the active variant. */
export function getCommerceConfig(): CommerceConfig {
  const id = getActiveVariant()
  return id === 'B' ? VARIANT_B : VARIANT_A
}
