import {useMediaQuery} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import {createContext, useContext, useEffect, useMemo, useState} from 'react'

export type AllThemes = 'light' | 'dark' | 'device'

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#f5f5f7',
    },
    text: {
      primary: '#353535',
    },
  },
})

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#353535',
    },
    text: {
      primary: '#f5f5f7',
    },
  },
})

export const ThemeContext = createContext<{
  themeMode: AllThemes
  handleChangeTheme: (newTheme: AllThemes) => void
}>({
  themeMode: 'light',
  handleChangeTheme: () => {},
})

export const useThemeContext = () => useContext(ThemeContext)

const useThemeMode = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  const getInitialThemeMode = (): AllThemes => {
    const storedTheme = localStorage.getItem('theme') as AllThemes
    return storedTheme || 'device'
  }

  const [themeMode, setThemeMode] = useState<AllThemes>(getInitialThemeMode())

  const theme = useMemo(() => {
    if (themeMode === 'device') {
      return prefersDarkMode ? darkTheme : lightTheme
    }
    return themeMode === 'dark' ? darkTheme : lightTheme
  }, [themeMode, prefersDarkMode])

  useEffect(() => {
    localStorage.setItem('theme', themeMode)
  }, [themeMode])

  const handleChangeTheme = (newTheme: AllThemes) => {
    if (newTheme === 'device') {
      setThemeMode('device')
    } else {
      setThemeMode(newTheme)
    }
  }

  return {theme, themeMode, handleChangeTheme}
}

export default useThemeMode
