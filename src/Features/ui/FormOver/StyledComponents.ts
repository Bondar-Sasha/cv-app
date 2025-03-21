import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

export const Overlay = styled(Box)(({theme}) => ({
  color: '#fff',
  zIndex: theme.zIndex.drawer + 1,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
}))

export const ButtonContainer = styled(Box)(({theme}) => ({
  display: 'flex',
  alignSelf: 'flex-end',
  position: 'relative',
  right: '-11px',
  gap: '10px',
  [theme.breakpoints.down('sm')]: {
    position: 'static',
    width: '100%',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
}))

export const StyledButton = styled(Button)(({theme}) => ({
  minWidth: '220px',
  height: '48px',
  borderColor: theme.palette.text.secondary,
}))
