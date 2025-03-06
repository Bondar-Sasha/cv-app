import {FC, useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {Box, ThemeProvider} from '@mui/material'
import {useApolloClient} from '@apollo/client'
import {I18nextProvider} from 'react-i18next'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {preparedApolloLink} from '../providers/ApolloClient'
import useThemeMode, {ThemeContext} from '../providers/ThemeProvider'
import i18n from '@/Shared/i18n/i18n'
import {useTokens} from '../utils'
import {CircleProgress} from '@/Shared'

const TOKEN_REFRESH_INTERVAL = 600000

const App: FC = () => {
  const client = useApolloClient()
  const {theme, themeMode, handleChangeTheme} = useThemeMode()
  const {isFetching, accessToken, refetchTokens} = useTokens()

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

  return isFetching ? (
    <Box
      width="100%"
      height="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircleProgress />
    </Box>
  ) : (
    <I18nextProvider i18n={i18n}>
      <ThemeContext.Provider value={{themeMode, handleChangeTheme}}>
        <ThemeProvider theme={theme}>
          <AppRoutes />
        </ThemeProvider>
      </ThemeContext.Provider>
      <ToastContainer
        theme={themeMode}
        position="bottom-right"
        autoClose={1500}
        pauseOnHover
      />
    </I18nextProvider>
  )
}

export default App
