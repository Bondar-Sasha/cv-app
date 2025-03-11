import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import FormControl from '@mui/material/FormControl'
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

export const FormBox = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '5px',
  padding: '20px 25px',
  maxWidth: '38%',
  minWidth: '550px',
  width: '100%',
  boxShadow:
    'rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '90%',
    minWidth: '0',
  },
}))

export const Form = styled(FormControl)({
  width: '100%',
  alignItems: 'flex-start',
  gap: '35px',
})

export const CloseButton = styled(IconButton)({
  position: 'absolute',
  top: '-8px',
  right: '-13px',
})

export const Title = styled(Typography)`
  font-size: ${({theme}) => theme.typography.h5};
  font-weight: 500;
  color: ${({theme}) => theme.palette.text.primary};
`

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
