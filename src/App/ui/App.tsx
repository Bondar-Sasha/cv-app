import {FC} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {createTheme, ThemeProvider} from '@mui/material'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'
import {client} from '../providers/ApolloClient'
import {ApolloProvider} from '@apollo/client'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ed6e47',
      dark: '#ed6e47',
    },
  },
})

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AppRoutes />
        <ToastContainer
          theme="light"
          position="bottom-right"
          autoClose={1500}
          pauseOnHover
        />
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
