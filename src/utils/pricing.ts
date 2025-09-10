/** 
 * pricing.ts
 * Centralized pricing logic:
 * - Bundle savings ladder (AOV driver) via config variants.
 * - Shipping estimator (free over threshold, flat below).
 * - Estimated tax helper for cart previews (clearly marked as an estimate).
 * - Free gift eligibility.
 */

import type { CartItem } from '../stores/cart'
import { getCommerceConfig } from '../config/commerce'

/** A discount step in the ladder. */
export interface DiscountStep {
  minItems: number
  rate: number
}

/**
 * getDiscountRateFromLadder - Finds the applicable discount given an item count and ladder.
 * @param itemCount Number of items being discounted
 * @param ladder Array of discount steps
 */
export function getDiscountRateFromLadder(itemCount: number, ladder: DiscountStep[]): number {
  let rate = 0
  for (const step of ladder) {
    if (itemCount >= step.minItems) {
      rate = step.rate
    }
  }
  return rate
}

/**
 * getBundleDiscountRate - Reads the active variant's ladder and computes the rate.
 * Backwards compatible name used across the app.
 */
export function getBundleDiscountRate(itemCount: number): number {
  const { discountLadder } = getCommerceConfig()
  return getDiscountRateFromLadder(itemCount, discountLadder)
}

/**
 * computeCartDiscount - Computes discount value and rate based on cart contents.
 * @param items Map of productId -> CartItem
 */
export function computeCartDiscount(
  items: Record<string, CartItem>
): { rate: number; amount: number } {
  const rows = Object.values(items)
  const itemCount = rows.reduce((acc, r) => acc + r.qty, 0)
  const rate = getBundleDiscountRate(itemCount)
  const subtotal = rows.reduce((sum, r) => sum + r.product.price * r.qty, 0)
  const amount = Math.round(subtotal * rate * 100) / 100
  return { rate, amount }
}

/**
 * estimateShipping - Returns a flat shipping price or free if threshold met.
 * @param subtotalAfterDiscount Subtotal once discounts are applied
 * @param freeThreshold Free shipping threshold
 */
export function estimateShipping(
  subtotalAfterDiscount: number,
  freeThreshold: number
): { cost: number; label: string } {
  if (subtotalAfterDiscount >= freeThreshold) {
    return { cost: 0, label: 'Free' }
  }
  // Simple heuristic; can be replaced by carrier matrix later
  return { cost: 5.99, label: 'Flat' }
}

/** Returns the active free-shipping threshold from config. */
export function getFreeShippingThreshold(): number {
  return getCommerceConfig().freeShippingThreshold
}

/** Convenience: shipping using active config threshold. */
export function estimateShippingUsingConfig(
  subtotalAfterDiscount: number
): { cost: number; label: string } {
  return estimateShipping(subtotalAfterDiscount, getFreeShippingThreshold())
}

/**
 * estimateTax - Rough estimate of sales tax for cart preview.
 * Note: This is an estimate and must be finalized at checkout.
 * @param subtotalAfterDiscount Subtotal after discounts
 * @param shippingCost Shipping cost to include in taxable base (varies by state)
 * @param rate Default pseudo CO metro rate of ~8.2% (0.082); override per geo if available
 */
export function estimateTax(
  subtotalAfterDiscount: number,
  shippingCost: number,
  rate = 0.082
): number {
  const base = Math.max(0, subtotalAfterDiscount + shippingCost)
  const tax = Math.round(base * rate * 100) / 100
  return tax
}

/**
 * computeFreeGiftEligibility - Determines if a free gift is unlocked.
 * Uses subtotal after discounts (before shipping).
 * @param subtotalAfterDiscount Subtotal after bundle discounts
 */
export function computeFreeGiftEligibility(
  subtotalAfterDiscount: number
): { eligible: boolean; remaining: number; threshold: number } {
  const threshold = getCommerceConfig().freeGiftThreshold
  const remaining = Math.max(0, threshold - subtotalAfterDiscount)
  const eligible = remaining <= 0
  return { eligible, remaining, threshold }
}
