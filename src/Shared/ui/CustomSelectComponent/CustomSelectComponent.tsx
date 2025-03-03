import {InputLabel, SelectChangeEvent} from '@mui/material'
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
  return (
    <CustomFormControl fullWidth disabled={disabled}>
      <InputLabel id="custom-select-label">{t(label)}</InputLabel>
      <CustomSelect
        labelId="custom-select-label"
        id="custom-select"
        value={value}
        label={t(label)}
        onChange={onChange}
      >
        {options.map((option) => (
          <CustomMenuItem key={option.value} value={option.value}>
            {t(option.label)}
          </CustomMenuItem>
        ))}
      </CustomSelect>
    </CustomFormControl>
  )
}

export default CustomSelectComponent
