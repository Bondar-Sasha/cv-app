import {Box, FormControl, IconButton, styled, Typography} from '@mui/material'

export const FormBox = styled(Box)(({theme}) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '5px',
  padding: '20px 25px',
  maxWidth: '38%',
  minWidth: '550px',
  width: '100%',
  maxHeight: 'calc(100% - 64px)',
  overflow: 'scroll',
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
