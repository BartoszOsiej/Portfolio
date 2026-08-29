import { useEffect } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const KEY = 'rust-dino-visits'
const TARGET = 10

export default function EasterEggRedirect(): null {
  const { siteConfig } = useDocusaurusContext()

  useEffect(() => {
    // don't trigger on the easter egg page itself
    if (window.location.pathname.includes('easter-egg')) return

    const raw = localStorage.getItem(KEY)
    const count = raw ? parseInt(raw, 10) + 1 : 1
    localStorage.setItem(KEY, String(count))

    if (count >= TARGET) {
      // reset counter
      localStorage.setItem(KEY, '0')
      // redirect after tiny delay so the user sees it
      setTimeout(() => {
        window.location.href = (siteConfig.baseUrl || '/') + 'easter-egg/'
      }, 300)
    }
  }, [])

  return null
}
