import {InputLabel, SelectChangeEvent, useTheme} from '@mui/material'
import {CustomFormControl, CustomMenuItem, CustomSelect} from './StyledElement'
import {useTranslation} from 'react-i18next'
import {FC} from 'react'

interface CustomSelectComponentProps {
  value: string
  onChange: (event: SelectChangeEvent<unknown>, child: React.ReactNode) => void
  options: {value: string; label: string}[]
  label: string
  disabled?: boolean
}

const CustomSelectComponent: FC<CustomSelectComponentProps> = ({
  value,
  onChange,
  options,
  label,
  disabled,
}) => {
  const {t} = useTranslation()
  const theme = useTheme()
  return (
    <CustomFormControl fullWidth disabled={disabled}>
      <InputLabel id="custom-select-label">{t(label)}</InputLabel>
      <CustomSelect
        labelId="custom-select-label"
        id="custom-select"
        value={value}
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
          const isNumber = !isNaN(option.value)
          return (
            <CustomMenuItem
              key={crypto.randomUUID()}
              value={option.value}
              style={{
                position: isNumber ? 'sticky' : 'static',
                backgroundColor: isNumber ? '#f0f0f0' : 'inherit',
                color: isNumber ? theme.palette.error.main : 'inherit',
                top: isNumber ? 0 : 'auto',
                padding: isNumber ? '20px 15px' : '13px 30px',
                fontSize: isNumber ? '15px' : '18px',
                cursor: isNumber ? 'default' : 'pointer',
              }}
            >
              {t(option.label)}
            </CustomMenuItem>
          )
        })}
      </CustomSelect>
    </CustomFormControl>
  )
}

export default CustomSelectComponent
