import {CustomSelectComponent} from '@/Shared'
import {LanguageOptions} from './Options'

const LanguageChange = () => {
  const handleChangeLanguage = () => {}
  return (
    <CustomSelectComponent
      value={'ru'}
      onChange={handleChangeLanguage}
      options={LanguageOptions}
      label="Язык"
    />
  )
}

export default LanguageChange
