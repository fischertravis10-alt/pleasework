/**
 * analytics.ts
 * Minimal, vendor-neutral tracking helper that pushes events to a global queue.
 * - Use `track(name, payload)` across the app.
 * - Later can be mapped to GA, Segment, etc., without changing call sites.
 */

export interface AnalyticsEvent {
  /** Event name, e.g., 'open_cart', 'add_to_cart' */
  name: string
  /** Arbitrary payload */
  payload?: Record<string, unknown>
  /** Millisecond timestamp */
  timestamp: number
}

/** Global event queue accessor on window. */
function getQueue(): AnalyticsEvent[] {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any
  if (!Array.isArray(w.__events)) {
    w.__events = []
  }
  return w.__events
}

/**
 * track - push an analytics event into a global queue; safe in any environment.
 */
export function track(name: string, payload?: Record<string, unknown>) {
  try {
    const evt: AnalyticsEvent = { name, payload, timestamp: Date.now() }
    getQueue().push(evt)
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.debug('[analytics]', evt)
    }
  } catch {
    // swallow
  }
}
