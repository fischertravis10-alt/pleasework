/**
 * faq.ts
 * Frequently Asked Questions data shared by the FAQ UI and JSON-LD.
 */

export interface FaqItem {
  /** The user-facing question text */
  question: string
  /** The answer in plain text (can include short marketing/acquisition details) */
  answer: string
}

/**
 * faqItems - Curated Q&A for shipping, returns, bundles, sizing, and support.
 * Keep answers concise for both UX and rich results eligibility.
 */
export const faqItems: FaqItem[] = [
  {
    question: 'What is your free shipping threshold?',
    answer:
      'Orders over $39 ship free within the contiguous US. Estimated delivery is 3–5 business days.',
  },
  {
    question: 'How do bundle discounts work?',
    answer:
      'Add any 3 or more eligible items to your cart and automatic tiered discounts apply at checkout—no code needed.',
  },
  {
    question: 'What is your return policy?',
    answer:
      'We offer 30‑day free returns on unused gear in original condition. Start a return from your order confirmation email.',
  },
  {
    question: 'How do I choose the right size for apparel?',
    answer:
      'Most base layers run true to size. If you are between sizes, size up for a relaxed fit or check the size guide on each product.',
  },
  {
    question: 'When does today’s order ship?',
    answer:
      'Orders placed before 2 pm MT ship the same business day. Expedited options are available at checkout.',
  },
]
