import {useMediaQuery} from '@mui/material'
import {createTheme} from '@mui/material/styles'
import {createContext, useContext, useMemo, useState} from 'react'

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
  const [themeMode, setThemeMode] = useState<AllThemes>(
    prefersDarkMode ? 'dark' : 'light'
  )

  const theme = useMemo(
    () => (themeMode === 'dark' ? darkTheme : lightTheme),
    [themeMode]
  )

  const handleChangeTheme = (newTheme: AllThemes) => {
    if (newTheme === 'device') {
      setThemeMode(prefersDarkMode ? 'dark' : 'light')
    } else {
      setThemeMode(newTheme)
    }
  }

  return {theme, themeMode, handleChangeTheme}
}

export default useThemeMode
