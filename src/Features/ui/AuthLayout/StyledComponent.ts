import { Box, Container, styled } from "@mui/material"

export const Wrapper = styled(Box)(() => ({
  maxWidth: '43%',
  width: '100%',
  '@media (max-width: 500px)': {
    maxWidth: '100%',
  },
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