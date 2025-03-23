import {Box, BoxProps, FormControl, styled} from '@mui/material'

export const Container = styled(Box)(({theme}) => ({
  height: '100vh',
  width: '100%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}))

export const Header = styled(Box)({
  width: '100%',
  paddingTop: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

export const Content = styled(Box)({
  maxWidth: '700px',
  width: '100%',
  height: 'calc(100% - 56px)',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Wrapper = styled(Box)({
  maxWidth: '43%',
  width: '100%',
  '@media (max-width: 500px)': {
    maxWidth: '100%',
  },
})

export const BoxCustom = styled(Box)<BoxProps>(() => ({
  width: '100%',
  alignItems: 'center',
}))

export const CustomFormControl = styled(FormControl)({
  width: '100%',
  alignItems: 'center',
})
