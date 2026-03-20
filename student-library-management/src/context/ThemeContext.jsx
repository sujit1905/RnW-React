import { createContext, useContext, useEffect, useMemo } from 'react'

const ThemeContext = createContext(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export function ThemeProvider({ children }) {
  // Enforce pure white premium theme; disable dark mode
  const value = useMemo(() => {
    return {
      theme: 'light',
      isDark: false,
      toggle: () => {},
      setTheme: () => {},
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark') // ensuring dark class is never present
    localStorage.setItem('slms_theme', 'light')
  }, [])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
