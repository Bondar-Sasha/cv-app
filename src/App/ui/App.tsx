import {createContext, FC, useContext, useMemo, useState} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {ThemeProvider, useMediaQuery} from '@mui/material'
import {ApolloProvider} from '@apollo/client'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {client} from '../providers/ApolloClient'
import {AllThemes, darkTheme, lightTheme} from '../providers/ThemeProvider'

export const ThemeContext = createContext<{
  themeMode: AllThemes
  handleChangeTheme: (newTheme: AllThemes) => void
}>({
  themeMode: 'light',
  handleChangeTheme: () => {},
})

export const useThemeContext = () => useContext(ThemeContext)

const App: FC = () => {
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

  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={{themeMode, handleChangeTheme}}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </ThemeContext.Provider>
      <ToastContainer
        theme={darkTheme ? 'dark' : 'light'}
        position="bottom-right"
        autoClose={1500}
        pauseOnHover
      />
    </ApolloProvider>
  )
}

export default App
