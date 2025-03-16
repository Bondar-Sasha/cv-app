import Box from '@mui/material/Box'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import Chip from '@mui/material/Chip'
import {FC} from 'react'
import {MenuItem, SxProps, Theme} from '@mui/material'

interface EnvSelectProps {
  sx: SxProps<Theme>
  value: string[]
  defaultValue?: string[]
  label: string
  placeholder: string
}

const EnvSelect: FC<EnvSelectProps> = ({
  value,
  defaultValue,
  label,
  placeholder,
  sx,
}) => {
  const preparedValue =
    defaultValue && !value.length === 0 ? defaultValue : value

  return (
    <FormControl sx={sx}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        disabled
        value={preparedValue}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <span style={{color: '#999'}}>{placeholder}</span>
          }
          return (
            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )
        }}
      >
        {preparedValue.map((name) => (
          <MenuItem key={name} value={name}>
            {name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

export default EnvSelect
