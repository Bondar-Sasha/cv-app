import {Box, styled} from '@mui/material'

export const Container = styled(Box)(({theme}) => ({
  width: '100%',
  height: '100vh',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}))

export const Wrapper = styled(Box)(() => ({
  maxWidth: '43%',
  width: '100%',
}))

export const Content = styled(Box)({
  width: '700px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})
