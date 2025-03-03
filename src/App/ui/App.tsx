import {FC} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {ThemeProvider} from '@mui/material'
import {ApolloProvider} from '@apollo/client'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {client} from '../providers/ApolloClient'
import {I18nextProvider} from 'react-i18next'
import i18n from '@/Shared/i18n/i18n'
import {ThemeContext} from '../providers'
import useThemeMode, {darkTheme} from '../providers/ThemeProvider'

const App: FC = () => {
  const {theme, themeMode, handleChangeTheme} = useThemeMode()

  return (
    <ApolloProvider client={client}>
      <I18nextProvider i18n={i18n}>
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
      </I18nextProvider>
    </ApolloProvider>
  )
}

export default App
