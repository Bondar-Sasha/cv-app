import {CustomSelectComponent} from '@/Shared'
import {LanguageOptions} from './Options'
import {useTranslation} from 'react-i18next'
import {SelectChangeEvent} from '@mui/material'

const LanguageChange = () => {
  const {i18n} = useTranslation()

  const changeLanguage = async (lng: string) => {
    await i18n.changeLanguage(lng)
  }

  const handleChangeLanguage = async (event: SelectChangeEvent<unknown>) => {
    await changeLanguage(event.target.value as string)
  }
  return (
    <>
      <CustomSelectComponent
        value={i18n.language}
        onChange={handleChangeLanguage}
        options={LanguageOptions}
        label="Language"
      />
    </>
  )
}

export default LanguageChange
