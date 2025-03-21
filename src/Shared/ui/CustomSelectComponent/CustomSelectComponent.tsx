import {InputLabel, SelectChangeEvent, useTheme} from '@mui/material'
import {CustomFormControl, CustomMenuItem, CustomSelect} from './StyledElement'
import {useTranslation} from 'react-i18next'
import {FC, forwardRef} from 'react'

interface CustomSelectComponentProps {
  value: string
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void
  options: {value: string; label: string}[]
  label: string
  disabled?: boolean
  defaultValue?: string
}

const CustomSelectComponent: FC<CustomSelectComponentProps> = forwardRef<
  HTMLDivElement,
  CustomSelectComponentProps
>(({value, onChange, options, label, disabled, defaultValue}, ref) => {
  const {t} = useTranslation()
  const theme = useTheme()
  return (
    <CustomFormControl fullWidth disabled={disabled}>
      <InputLabel id="custom-select-label">{t(label)}</InputLabel>
      <CustomSelect
        ref={ref}
        labelId="custom-select-label"
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
      >
        {options.map((option) => {
          const isHidden = option.value === 'notSelect'
          return (
            <CustomMenuItem
              key={crypto.randomUUID()}
              value={option.value}
              style={{
                position: isHidden ? 'sticky' : 'static',
                backgroundColor: isHidden ? '#f0f0f0' : 'inherit',
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
      </CustomSelect>
    </CustomFormControl>
  )
})

export default CustomSelectComponent
