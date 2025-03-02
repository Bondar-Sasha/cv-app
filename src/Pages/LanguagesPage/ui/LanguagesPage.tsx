import {InnerWrapper} from '@/Pages/ui/StyledComponents'
import {StyledButton} from '@/Shared'
import AddIcon from '@mui/icons-material/Add'
import {useTranslation} from 'react-i18next'

const LanguagesPage = () => {
  const {t} = useTranslation()

  return (
    <InnerWrapper>
      <StyledButton>
        <AddIcon style={{marginRight: '8px'}} /> {t('Add skill')}
      </StyledButton>
    </InnerWrapper>
  )
}

export default LanguagesPage
