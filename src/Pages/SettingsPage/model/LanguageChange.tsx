import {CustomSelectComponent} from '@/Shared'
import {LanguageOptions} from './Options'
import {useTranslation} from 'react-i18next'

const LanguageChange = () => {
  const {t, i18n} = useTranslation()

  const changeLanguage = async (lng) => {
    await i18n.changeLanguage(lng)
  }

  const handleChangeLanguage = async (e) => {
    await changeLanguage(e.target.value)
  }
  return (
    <>
      <CustomSelectComponent
        value={i18n.language}
        onChange={handleChangeLanguage}
        options={LanguageOptions}
        label={t('Язык')}
      />
    </>
  )
}

export default LanguageChange
