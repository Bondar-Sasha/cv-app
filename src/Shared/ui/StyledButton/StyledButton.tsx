import React from 'react'
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'

interface StyledButtonProps {
  variant?: 'contained' | 'outlined' | 'text'
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

const StyledButton = styled(Button)<StyledButtonProps>(({theme, variant}) => ({
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
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

export default StyledButton
