import React, {useState, forwardRef} from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import {Visibility, VisibilityOff} from '@mui/icons-material'
import {SxProps, useTheme} from '@mui/material/styles'
import {FieldErrors, UseFormRegisterReturn} from 'react-hook-form'
import {useTranslation} from 'react-i18next'

interface CustomTextFieldProps extends Omit<UseFormRegisterReturn, 'ref'> {
  id?: string
  label: string
  name: string
  type?: string
  autoComplete?: string
  placeholder?: string
  inputRef?: React.Ref<HTMLInputElement>
  sx?: SxProps
  errors?: FieldErrors
  icon?: React.ReactNode
  multiline?: boolean
  minRows?: number | string
  maxRows?: number | string
  disabled?: boolean
  defaultValue?: string
  required?: boolean
}

const CustomTextField = forwardRef<HTMLInputElement, CustomTextFieldProps>(
  (
    {
      id,
      sx,
      label,
      name,
      type = 'text',
      autoComplete,
      placeholder,
      errors,
      icon,
      multiline,
      minRows,
      maxRows,
      disabled,
      defaultValue,
      required,
      ...props
    },
    ref
  ) => {
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
    const errorMessage = errors?.[name]?.message

    return (
      <TextField
        {...props}
        variant="outlined"
        margin="normal"
        fullWidth
        id={id || name}
        name={name}
        label={t(label)}
        type={showPassword && isPasswordType ? 'text' : type}
        autoComplete={autoComplete}
        placeholder={placeholder ? t(placeholder) : undefined}
        multiline={multiline}
        minRows={minRows}
        maxRows={maxRows}
        helperText={
          typeof errorMessage === 'string' ? t(errorMessage) : undefined
        }
        error={!!errors?.[name]}
        disabled={disabled}
        defaultValue={defaultValue}
        required={required}
        inputRef={ref}
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
            },
            '&.Mui-focused fieldset': {
              borderColor: redColor,
            },
            '& input': {
              '&:-webkit-autofill': {
                WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
                WebkitTextFillColor: theme.palette.text.primary,
              },
            },
          },
          '& .MuiInputLabel-root': {
            '&.Mui-focused': {
              color: redColor,
            },
          },
          ...sx,
        }}
      />
    )
  }
)

export default CustomTextField
