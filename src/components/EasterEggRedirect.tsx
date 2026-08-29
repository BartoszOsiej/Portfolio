import { useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

/**
 * Tracks page loads via localStorage.
 * After EXACTLY 10 loads, redirects to /easter-egg/.
 * Works with F5, Ctrl+R, Ctrl+Shift+R, new tab, back button, etc.
 */
const KEY = 'rust_dino_v'
const TARGET = 10

export default function EasterEggRedirect(): null {
  const { siteConfig } = useDocusaurusContext()

  useEffect(() => {
    const path = window.location.pathname

    // never trigger on the easter egg page itself
    if (path.includes('easter-egg')) {
      // clean up if someone lands here directly
      localStorage.removeItem(KEY)
      return
    }

    // never trigger during build / SSR
    if (typeof window === 'undefined') return

    try {
      const raw = localStorage.getItem(KEY)
      const count = raw !== null ? parseInt(raw, 10) : 0

      // guard: NaN or negative → reset
      const safe = isNaN(count) || count < 0 ? 0 : count
      const next = safe + 1

      localStorage.setItem(KEY, String(next))

      if (next >= TARGET) {
        // reset immediately so next visit starts fresh
        localStorage.setItem(KEY, '0')

        // redirect — tiny delay so browser finishes painting current frame
        requestAnimationFrame(() => {
          window.location.href = (siteConfig.baseUrl || '/') + 'easter-egg/'
        })
      }
    } catch {
      // localStorage disabled / full — silently ignore
    }
  }, [])

  return null
}
