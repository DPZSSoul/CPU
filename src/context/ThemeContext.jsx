/**
 * Theme - dark/light mode, persisted to localStorage
 */

import { createContext, useContext, useState, useEffect } from 'react'

const STORAGE_KEY = 'pc-learning-theme'
const FONT_KEY = 'pc-learning-font'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [fontSize, setFontSize] = useState(() => {
    try {
      return localStorage.getItem(FONT_KEY) || 'normal'
    } catch { return 'normal' }
  })
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return saved === 'dark'
      return true
    } catch {
      return true
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [dark])

  useEffect(() => {
    localStorage.setItem(FONT_KEY, fontSize)
    document.documentElement.classList.remove('text-base', 'text-lg')
    document.documentElement.classList.add(fontSize === 'large' ? 'text-lg' : 'text-base')
  }, [fontSize])

  const toggle = () => setDark((d) => !d)
  const setFont = (f) => setFontSize(f)

  return (
    <ThemeContext.Provider value={{ dark, toggle, fontSize, setFontSize: setFont }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  return ctx || { dark: false, toggle: () => {}, fontSize: 'normal', setFontSize: () => {} }
}
