import {Button, styled} from '@mui/material'

const StyledButton = styled(Button)(({theme, variant}) => ({
  width: '100%',
  backgroundColor: variant === 'contained' ? theme.palette.error.main : 'none',
  color:
    variant === 'contained'
      ? theme.palette.common.white
      : theme.palette.text.secondary,
  padding: theme.spacing(2),
  fontSize: '16px',
  borderRadius: '40px',
  '&:hover': {
    backgroundColor:
      variant === 'contained'
        ? 'rgb(138, 33, 34)'
        : 'rgba(118, 118, 118, 0.04)',
  },
}))

export default StyledButton
