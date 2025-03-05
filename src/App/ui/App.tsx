import {FC, useEffect} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {Box, ThemeProvider} from '@mui/material'
import {ApolloProvider} from '@apollo/client'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {client, preparedApolloLink} from '../providers/ApolloClient'
import useThemeMode, {darkTheme, ThemeContext} from '../providers/ThemeProvider'
import {I18nextProvider} from 'react-i18next'
import i18n from '@/Shared/i18n/i18n'
import {useTokens} from '../utils'
import {CircleProgress} from '@/Shared'

const App: FC = () => {
  const {theme, themeMode, handleChangeTheme} = useThemeMode()
  const {isFetching, accessToken} = useTokens()

  useEffect(() => {
    if (accessToken) {
      client.setLink(preparedApolloLink(accessToken))
    }
  }, [accessToken])

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
