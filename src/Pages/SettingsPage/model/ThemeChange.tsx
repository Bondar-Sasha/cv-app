import {AllThemes} from '@/App'
import {useThemeContext} from '@/App/ui/App'
import {
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import {useState} from 'react'
import {CustomSelect} from '../ui/StyledComponents'

const ThemeChange = () => {
  const {themeMode, handleChangeTheme} = useThemeContext()
  const [theme, setTheme] = useState(themeMode)

  const handleChangeThemes = (e: SelectChangeEvent<unknown>) => {
    const newTheme = e.target.value as AllThemes
    handleChangeTheme(newTheme)
    setTheme(newTheme)
  }

  return (
    <FormControl fullWidth>
      <InputLabel id="select-theme-label">Внешний вид</InputLabel>
      <CustomSelect
        labelId="select-theme-label"
        id="select-theme"
        value={theme}
        label="Внешний вид"
        onChange={handleChangeThemes}
      >
        <MenuItem value={'light'}>Светлый</MenuItem>
        <MenuItem value={'dark'}>Темный</MenuItem>
        <MenuItem value={'device'}>Настройки устройства</MenuItem>
      </CustomSelect>
    </FormControl>
  )
}

export default ThemeChange
