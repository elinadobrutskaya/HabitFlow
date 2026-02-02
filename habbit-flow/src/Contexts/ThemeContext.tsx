import React, { useContext, useState, type ReactNode } from 'react'
import { Storage } from '../Services/storage'

interface ThemeContextValue {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const defaultThemeContext: ThemeContextValue = {
  theme: 'light',
  toggleTheme: () => {},
}

const ThemeContext = React.createContext<ThemeContextValue>(defaultThemeContext)

interface ThemeProviderProps {
  children: ReactNode
}

export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}

const THEME_KEY = 'theme'

const storage = new Storage(THEME_KEY)

const applyTheme = (newTheme: 'light' | 'dark') => {
  document.documentElement.setAttribute('data-theme', newTheme)
}

const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = storage.get() || 'light'

  applyTheme(savedTheme as 'light' | 'dark')
  return savedTheme as 'light' | 'dark'
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    applyTheme(newTheme)
    storage.set(newTheme)
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
