import {StyledButton} from '@/Shared'
import {FC} from 'react'

interface WrapperButtonProps {
  children: React.ReactNode
  color?: string
  onClick?: () => void
  variant?: 'text' | 'outlined' | 'contained'
  disabled?: boolean
}

const WrapperButton: FC<WrapperButtonProps> = ({
  children,
  color,
  onClick,
  variant = 'text',
  disabled,
}) => (
  <StyledButton
    disabled={disabled}
    variant={variant}
    onClick={onClick}
    sx={(theme) => ({
      whiteSpace: 'nowrap',
      padding: '10px 42px',
      color: color,
      fontSize: '.9rem',
      minWidth: '215px',
      [theme.breakpoints.down('sm')]: {
        minWidth: '0',
      },
    })}
  >
    {children}
  </StyledButton>
)

export default WrapperButton
