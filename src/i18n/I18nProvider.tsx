/**
 * I18nProvider.tsx
 * Minimal i18next + react-i18next setup for future localization.
 * - No external language detector (keeps deps minimal).
 * - Default/fallback language: 'en'.
 * - Ready to extend with resources and namespaces.
 */

import { PropsWithChildren, useRef } from 'react'
import i18n, { Resource } from 'i18next'
import { I18nextProvider } from 'react-i18next'

/** Initialize i18next once per app session. */
function ensureInit() {
  if (i18n.isInitialized) return
  const resources: Resource = {
    en: {
      common: {
        appName: 'High Country Gear',
      },
    },
  }
  i18n.init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })
}

/** I18nProvider - wraps children with react-i18next provider. */
export default function I18nProvider({ children }: PropsWithChildren) {
  const inited = useRef(false)
  if (!inited.current) {
    ensureInit()
    inited.current = true
  }
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
