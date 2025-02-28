import {InputLabel} from '@mui/material'
import {CustomFormControl, CustomMenuItem, CustomSelect} from './StyledElement'

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
  return (
    <CustomFormControl fullWidth>
      <InputLabel id="custom-select-label">{label}</InputLabel>
      <CustomSelect
        labelId="custom-select-label"
        id="custom-select"
        value={value}
        label={label}
        onChange={onChange}
      >
        {options.map((option) => (
          <CustomMenuItem key={option.value} value={option.value}>
            {option.label}
          </CustomMenuItem>
        ))}
      </CustomSelect>
    </CustomFormControl>
  )
}

export default CustomSelectComponent
