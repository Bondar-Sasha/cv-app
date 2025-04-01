import {Box, styled} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

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

interface CustomArrowProps {
  arrowState: boolean | null
}

export const CustomArrow = styled(ArrowUpwardIcon, {
  shouldForwardProp: (prop) => prop !== 'arrowState',
})<CustomArrowProps>(({arrowState}) => ({
  color: 'inherit',
  fontSize: '15px',
  marginLeft: '7px',
  cursor: 'pointer',
  visibility: arrowState === null ? 'hidden' : 'visible',
  transform: arrowState ? 'rotate(0deg)' : 'rotate(180deg)',
}))
