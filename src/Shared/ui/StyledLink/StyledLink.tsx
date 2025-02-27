import {Button, ButtonProps, styled} from '@mui/material'
import {LinkProps} from 'react-router-dom'

interface StyledLinkProps extends ButtonProps, LinkProps {
  active?: boolean
}

const StyledLink = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'active',
})<StyledLinkProps>(({theme, active}) => ({
  textDecoration: 'none',
  padding: '15px 50px 10px 50px',
  color: active ? theme.palette.error.main : theme.palette.text.primary,
  borderBottom: active ? `2px solid ${theme.palette.error.main}` : 'none',
  cursor: 'pointer',
  borderRadius: '0',
  fontSize: '1rem',
  fontWeight: '600',
  '&:hover': {
    backgroundColor: 'inherit',
    color: active ? theme.palette.error.main : theme.palette.text.primary,
  },
}))

export default StyledLink
