import {createContext, FC, useState} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {createTheme, ThemeProvider} from '@mui/material'
import {ApolloProvider} from '@apollo/client'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {client} from '../providers/ApolloClient'

interface ThemeContextValues {
  themeHandler: () => void
}

const ThemeContext = createContext<ThemeContextValues>({
  themeHandler: () => {},
})

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fff',
    },
    text: {
      primary: '#353535',
    },
  },
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#353535',
    },
    text: {
      primary: '#fff',
    },
  },
})

const App: FC = () => {
  const [isDarkTheme, setTheme] = useState<boolean>(false)
  const handelThemeSwitching = () => {
    setTheme((prev) => !prev)
  }

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <ApolloProvider client={client}>
        <ThemeContext.Provider value={{themeHandler: handelThemeSwitching}}>
          <AppRoutes />
        </ThemeContext.Provider>
      </ApolloProvider>
      <ToastContainer
        theme={isDarkTheme ? 'dark' : 'light'}
        position="bottom-right"
        autoClose={1500}
        pauseOnHover
      />
    </ThemeProvider>
  )
}

export default App
