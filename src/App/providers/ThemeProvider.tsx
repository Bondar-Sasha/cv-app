import {createTheme} from '@mui/material/styles'

export type AllThemes = 'light' | 'dark' | 'device'

const lightTheme = createTheme({
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

const darkTheme = createTheme({
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

export {lightTheme, darkTheme}
