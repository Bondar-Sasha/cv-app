import {Box, styled} from '@mui/material'

export const InnerWrapper = styled(Box)(({theme}) => ({
  maxWidth: '70%',
  width: '100%',
  margin: '0 auto',
  padding: '30px 20px 25px 25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '30px 0',
  },
}))
