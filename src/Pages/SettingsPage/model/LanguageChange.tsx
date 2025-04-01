import {CustomSelectComponent} from '@/Shared'
import {LanguageOptions} from './Options'
import {useTranslation} from 'react-i18next'
import {SelectChangeEvent} from '@mui/material'

const LanguageChange = () => {
  const {i18n} = useTranslation()

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng)
  }

  const handleChangeLanguage = async (event: SelectChangeEvent<string>) => {
    await changeLanguage(event.target.value)
  }
  return (
    <>
      <CustomSelectComponent
        value={i18n.language.split('-')[0]}
        onChange={handleChangeLanguage}
        options={LanguageOptions}
        label="Language"
      />
    </>
  )
}

export default LanguageChange
