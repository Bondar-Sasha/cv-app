import {AllThemes, useThemeContext} from '@/App'
import {CustomSelectComponent} from '@/Shared'
import {useState} from 'react'
import {ThemeOptions} from './Options'

const ThemeChange = () => {
  const {themeMode, handleChangeTheme} = useThemeContext()
  const [theme, setTheme] = useState<AllThemes>(themeMode)

  return (
    <CustomSelectComponent
      value={theme}
      onChange={(e) => {
        const newTheme = e.target.value as AllThemes
        handleChangeTheme(newTheme)
        setTheme(newTheme)
      }}
      options={ThemeOptions}
      label="Appearance"
    />
  )
}

export default ThemeChange
