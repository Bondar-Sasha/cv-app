import {Button, styled} from '@mui/material'

const StyledButton = styled(Button)(({theme}) => ({
  width: '100%',
  backgroundColor: theme.palette.error.main,
  color: theme.palette.common.white,
  padding: theme.spacing(2),
  fontSize: '16px',
  borderRadius: '40px',
  '&:hover': {
    backgroundColor: 'rgb(138, 33, 34)',
  },
}))

export default StyledButton
