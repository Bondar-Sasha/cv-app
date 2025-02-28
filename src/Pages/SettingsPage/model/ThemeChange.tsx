import {AllThemes, useThemeContext} from '@/App'
import {CustomSelectComponent} from '@/Shared'
import {SelectChangeEvent} from '@mui/material'
import {useState} from 'react'
import {ThemeOptions} from './Options'

const ThemeChange = () => {
  const {themeMode, handleChangeTheme} = useThemeContext()
  const [theme, setTheme] = useState(themeMode)

  const handleChangeThemes = (e: SelectChangeEvent<unknown>) => {
    const newTheme = e.target.value as AllThemes
    handleChangeTheme(newTheme)
    setTheme(newTheme)
  }

  return (
    <CustomSelectComponent
      value={theme}
      onChange={handleChangeThemes}
      options={ThemeOptions}
      label="Внешний вид"
    />
  )
}

export default ThemeChange
