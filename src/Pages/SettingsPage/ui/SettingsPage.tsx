import ThemeChange from '../model/ThemeChange'
import LanguageChange from '../model/LanguageChange'
import {BoxWrapper} from './StyledComponents'

const SettingsPage = () => {
  return (
    <BoxWrapper>
      <ThemeChange />
      <LanguageChange />
    </BoxWrapper>
  )
}

export default SettingsPage
