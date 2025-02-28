import {FormControl, InputLabel, MenuItem} from '@mui/material'
import {CustomSelect} from '../ui/StyledComponents'

const LanguageChange = () => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-language-label">{'Язык'}</InputLabel>
      <CustomSelect
        labelId="select-language-label"
        id="select-language"
        value={'ru'}
        label="Язык"
        // OnChange={handleChange}
      >
        <MenuItem value={'en'}>English</MenuItem>
        <MenuItem value={'de'}>Deutsch</MenuItem>
        <MenuItem value={'ru'}>Русский</MenuItem>
      </CustomSelect>
    </FormControl>
  )
}

export default LanguageChange
