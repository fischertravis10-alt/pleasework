/**
 * ThemeProvider.tsx
 * Next-themes wrapper configured with class strategy for Tailwind dark mode.
 * Keeps transitions disabled during theme changes to avoid jank.
 */

import type { ReactNode } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

/** Props for ThemeProvider wrapper. */
interface ThemeProviderProps {
  /** Children to render within the theme context */
  children: ReactNode
}

/**
 * ThemeProvider - wraps the app and toggles the `dark` class on <html>.
 */
export default function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
