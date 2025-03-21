import React, {useState} from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {SxProps, useTheme} from '@mui/material/styles'
import {FieldErrors, UseFormRegister} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

interface CustomTextFieldProps {
  id?: string
  label: string
  name: string
  type: string
  autoComplete: string
  placeholder?: string
  sx?: SxProps
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  errors?: FieldErrors
  icon?: React.ReactNode
  multiline?: boolean
  minRows?: number
  disabled?: boolean
  defaultValue?: string
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  id,
  sx,
  label,
  name,
  type,
  autoComplete,
  placeholder,
  register,
  errors,
  icon,
  multiline,
  minRows,
  disabled,
  defaultValue,
}) => {
  const theme = useTheme()
  const redColor = theme.palette.error.main
  const [showPassword, setShowPassword] = useState(false)
  const {t} = useTranslation()

  const handleClickShowPassword = () => setShowPassword(!showPassword)
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const isPasswordType = type === 'password'

  return (
    <TextField
      variant="outlined"
      margin="normal"
      multiline={multiline}
      minRows={minRows}
      fullWidth
      id={id}
      label={t(label)}
      autoComplete={autoComplete}
      placeholder={t(placeholder || '')}
      type={showPassword && isPasswordType ? 'text' : type}
      {...register(name)}
      helperText={errors?.[name]?.message?.toString()}
      error={!!errors?.[name]}
      disabled={disabled}
      defaultValue={defaultValue}
      slotProps={{
        input: {
          endAdornment: isPasswordType && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : icon || <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderRadius: 0,
            '&.Mui-focused': {
              borderColor: redColor,
            },
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: redColor,
          },
          '&.Mui-focused': {
            boxShadow: 'none',
          },
          '& input': {
            '&:-webkit-autofill': {
              fontSize: '1.2rem',
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
            '&:-webkit-autofill:focus': {
              WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
              WebkitTextFillColor: theme.palette.text.primary,
            },
          },
        },
        '& .MuiInputLabel-root.Mui-focused': {
          color: redColor,
        },
        ...sx,
      }}
    />
  )
}

export default CustomTextField
