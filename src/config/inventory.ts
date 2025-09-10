/**
 * inventory.ts
 * Per-category low-stock threshold configuration and helpers.
 * Used to calibrate urgency messaging per category.
 */

export interface LowStockThresholds {
  /** Mapping of categoryId to low-stock threshold (inclusive) */
  [categoryId: string]: number
}

/**
 * CATEGORY_LOW_STOCK
 * Tuned defaults based on category velocity and replenishment patterns.
 * If a category is not found, the `default` threshold is used.
 */
export const CATEGORY_LOW_STOCK: LowStockThresholds = {
  // Lighting and hardgoods
  headlamps: 5,
  cookware: 5,
  knives: 3,
  'multi-tools': 4,

  // Softgoods (typically more sizes/variants to juggle)
  'base-layers': 7,
  'hiking-socks': 8,
  gloves: 6,
  hats: 6,

  // Hydration (higher inventory, but customers value scarcity cues)
  'water-bottles': 6,

  // Fallback
  default: 5,
}

/**
 * getLowStockThreshold - Returns the calibrated threshold for a category.
 */
export function getLowStockThreshold(categoryId?: string): number {
  if (!categoryId) return CATEGORY_LOW_STOCK.default
  return CATEGORY_LOW_STOCK[categoryId] ?? CATEGORY_LOW_STOCK.default
}

/**
 * isLowStock - Determines whether the given stock count qualifies as low stock.
 * - Only triggers when stock is known and > 0.
 */
export function isLowStock(stock: number | undefined, categoryId?: string): boolean {
  if (typeof stock !== 'number' || stock <= 0) return false
  const threshold = getLowStockThreshold(categoryId)
  return stock <= threshold
}
