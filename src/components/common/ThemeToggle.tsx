/**
 * ThemeToggle.tsx
 * Small button to toggle between light/dark/system themes.
 * - Uses next-themes to persist selection.
 * - Icon-only on mobile; label appears for screen readers.
 */

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

/**
 * ThemeToggle - toggles the theme; cycles Light → Dark → System.
 */
export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch; next-themes recommends gating on mounted
  useEffect(() => setMounted(true), [])

  /** Go to the next theme in the cycle. */
  function cycleTheme() {
    if (!mounted) return
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const label =
    !mounted ? 'Toggle theme' : theme === 'light' ? 'Switch to dark' : theme === 'dark' ? 'Use system theme' : 'Switch to light'

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="inline-flex items-center justify-center rounded-lg border border-[#2F5D3A]/50 px-3 py-2 text-sm font-medium text-[#2F5D3A] hover:bg-[#2F5D3A]/10 dark:border-neutral-600 dark:text-neutral-200 dark:hover:bg-neutral-800"
    >
      {mounted && (resolvedTheme === 'dark' ? <Moon className="h-4 w-4 text-black" /> : <Sun className="h-4 w-4" />)}
      {!mounted && <Sun className="h-4 w-4" />}
      <span className="sr-only">Theme</span>
    </button>
  )
}
