import {Box, styled} from '@mui/material'

export const BoxWrapper = styled(Box)(({theme}) => ({
  width: '60%',
  margin: '0 auto',
  padding: '25px 10px 25px 35px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '30px',
  [theme.breakpoints.down('sm')]: {
    width: '80%',
    padding: '25px 0',
  },
}))
