import {FC} from 'react'
import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from 'react-toastify'
import {createTheme, ThemeProvider} from '@mui/material'
import 'normalize.css'

import {AppRoutes} from '../routes'
import '../styles/index.css'

const MUITheme = createTheme({
  palette: {
    primary: {
      main: '#ed6e47',
      dark: '#ed6e47',
    },
  },
})

const App: FC = () => {
  return (
    <ThemeProvider theme={MUITheme}>
      <AppRoutes />
      <ToastContainer
        theme="light"
        position="bottom-right"
        autoClose={1500}
        pauseOnHover
      />
    </ThemeProvider>
  )
}

export default App
