import {
  FormHelperText,
  InputLabel,
  Select,
  SelectChangeEvent,
  useTheme,
} from '@mui/material'
import {CustomFormControl, CustomMenuItem} from './StyledElement'
import {useTranslation} from 'react-i18next'
import {forwardRef, ReactNode} from 'react'

interface CustomSelectComponentProps<T> {
  value: T
  onChange: (event: SelectChangeEvent<T>, child?: ReactNode) => void
  options: {value: T; label: string}[]
  label: string
  helpingText?: string
  disabled?: boolean
  defaultValue?: T
}

const CustomSelectComponent = forwardRef(
  <T extends string>(
    {
      value,
      onChange,
      options,
      label,
      disabled,
      defaultValue,
      helpingText,
    }: CustomSelectComponentProps<T>,
    ref: React.Ref<HTMLDivElement>
  ) => {
    const {t} = useTranslation()
    const theme = useTheme()

    return (
      <CustomFormControl fullWidth disabled={disabled}>
        <InputLabel>{t(label)}</InputLabel>
        <Select
          ref={ref}
          id="custom-select"
          value={defaultValue && !value ? defaultValue : value}
          label={t(label)}
          onChange={onChange}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 350,
                overflowY: 'auto',
              },
            },
          }}
          sx={(theme) => ({
            '& .MuiSelect-select': {
              boxSizing: 'border-box',
              fontSize: '1.2rem',
              lineHight: '1.8rem',
              paddingTop: '19px',
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                width: '100%',
                borderRadius: 0,
                borderColor: theme.palette.error.main,
                '&.Mui-focused': {
                  borderColor: theme.palette.error.main,
                },
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.error.main,
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
            '& .MuiOutlinedInput-notchedOutline': {
              borderRadius: '0',
              '&.Mui-focused': {
                borderColor: theme.palette.error.main,
              },
            },
          })}
        >
          {options.map((option) => {
            const isHidden = option.value === 'notSelect'
            return (
              <CustomMenuItem
                key={crypto.randomUUID()}
                value={option.value}
                style={{
                  position: isHidden ? 'sticky' : 'static',
                  backgroundColor:
                    isHidden && theme.palette.mode === 'light'
                      ? '#f0f0f0'
                      : isHidden && theme.palette.mode === 'dark'
                        ? theme.palette.background.default
                        : 'inherit',
                  color: isHidden ? theme.palette.error.main : 'inherit',
                  top: isHidden ? 0 : 'auto',
                  padding: isHidden ? '20px 15px' : '13px 30px',
                  fontSize: isHidden ? '15px' : '18px',
                  cursor: isHidden ? 'default' : 'pointer',
                  pointerEvents: isHidden ? 'none' : undefined,
                }}
              >
                {t(option.label)}
              </CustomMenuItem>
            )
          })}
        </Select>
        {helpingText && (
          <FormHelperText sx={{color: theme.palette.error.main}}>
            {t(helpingText)}
          </FormHelperText>
        )}
      </CustomFormControl>
    )
  }
)

export default CustomSelectComponent
