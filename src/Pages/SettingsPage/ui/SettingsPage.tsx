import {AllThemes} from '@/App'
import {useThemeContext} from '@/App/ui/App'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  SelectProps,
  styled,
} from '@mui/material'
import {useState} from 'react'

export const BoxWrapper = styled(Box)({
  width: '58%',
  margin: '0 auto',
  padding: '15px 0',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'center',
  gap: '30px',
})

const CustomSelect = styled(Select)<SelectProps>(({theme}) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0',
    '&.Mui-focused': {
      borderColor: theme.palette.error.main,
    },
  },
}))

const SettingsPage = () => {
  const {themeMode, handleChangeTheme} = useThemeContext()
  const [theme, setTheme] = useState(themeMode)

  const handleChangeThemes = (e: SelectChangeEvent<unknown>) => {
    const newTheme = e.target.value as AllThemes
    handleChangeTheme(newTheme)
    setTheme(newTheme)
  }

  return (
    <BoxWrapper>
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
    </BoxWrapper>
  )
}

export default SettingsPage
