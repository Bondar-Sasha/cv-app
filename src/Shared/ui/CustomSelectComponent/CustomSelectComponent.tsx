import {InputLabel} from '@mui/material'
import {CustomFormControl, CustomMenuItem, CustomSelect} from './StyledElement'
import {useTranslation} from 'react-i18next'

interface CustomSelectComponentProps {
  value: string
  onChange: (event: React.ChangeEvent<{value: unknown}>) => void
  options: {value: string; label: string}[]
  label: string
}

const CustomSelectComponent: React.FC<CustomSelectComponentProps> = ({
  value,
  onChange,
  options,
  label,
}) => {
  const {t} = useTranslation()
  return (
    <CustomFormControl fullWidth>
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
