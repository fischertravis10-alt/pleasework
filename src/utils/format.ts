/**
 * format.ts
 * Currency and text formatting helpers for consistent UI presentation.
 */

export interface MoneyFormatOptions {
  /** Locale, defaults to en-US */
  locale?: string
  /** Currency code, defaults to USD */
  currency?: string
}

/**
 * formatMoney - Formats a number as currency with proper locale rules.
 */
export function formatMoney(value: number, opts: MoneyFormatOptions = {}): string {
  const { locale = 'en-US', currency = 'USD' } = opts
  return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(value)
}

/**
 * pluralize - Basic pluralization helper for UI strings.
 */
export function pluralize(count: number, singular: string, plural?: string): string {
  return count === 1 ? singular : plural ?? `${singular}s`
}
