import {Box, styled} from '@mui/material'
import ThemeChange from '../model/ThemeChange'
import LanguageChange from '../model/LanguageChange'

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

const SettingsPage = () => {
  return (
    <BoxWrapper>
      <ThemeChange />
      <LanguageChange />
    </BoxWrapper>
  )
}

export default SettingsPage
