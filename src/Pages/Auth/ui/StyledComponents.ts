import { Box, styled } from "@mui/material"

export const Container = styled(Box)(({theme}) => ({
  height: '100vh',
  margin: '0 auto',
  padding: '0 20px',
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
  width: '700px',
  height: 'calc(100% - 56px)',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const Wrapper = styled(Box)(() => ({
  maxWidth: '43%',
  width: '100%',
}))

export const StyledContainer = styled(Container)({
  display: 'flex',
  Width: '100%',
  height: 'max-content',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
})