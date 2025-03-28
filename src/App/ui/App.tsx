import {FC, useEffect, useState} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {ThemeProvider} from '@mui/material'
import {useApolloClient} from '@apollo/client'
import {I18nextProvider} from 'react-i18next'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {preparedApolloLink} from '../providers/ApolloClient'
import useThemeMode, {ThemeContext} from '../providers/ThemeProvider'
import i18n from '@/Shared/i18n/i18n'
import {useTokens} from '../utils'
import {LoaderBackdrop} from '@/Shared'
import {BreadContext} from '../providers'

const TOKEN_REFRESH_INTERVAL = 590000

const App: FC = () => {
  const client = useApolloClient()
  const {theme, themeMode, handleChangeTheme} = useThemeMode()
  const {isFetching, accessToken, refetchTokens} = useTokens()
  const [currentBread, setCurrentBread] = useState('')

  useEffect(() => {
    if (accessToken) {
      client.setLink(preparedApolloLink(accessToken))
    }
  }, [accessToken, client])

  useEffect(() => {
    const scheduleTokenRefresh = () => {
      const timeoutId = setTimeout(() => {
        refetchTokens()
      }, TOKEN_REFRESH_INTERVAL)

      return timeoutId
    }

    const timeoutId = scheduleTokenRefresh()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [refetchTokens])

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeContext.Provider value={{themeMode, handleChangeTheme}}>
        <ThemeProvider theme={theme}>
          <BreadContext.Provider value={{currentBread, setCurrentBread}}>
            {isFetching ? <LoaderBackdrop loading /> : <AppRoutes />}
          </BreadContext.Provider>
        </ThemeProvider>
      </ThemeContext.Provider>
      <ToastContainer
        theme={theme.palette.mode === 'light' ? 'dark' : 'light'}
        position="top-right"
        autoClose={4000}
        pauseOnHover
        closeButton={false}
        hideProgressBar={true}
        icon={false}
        style={{justifyContent: 'center !important'}}
      />
    </I18nextProvider>
  )
}

export default App
