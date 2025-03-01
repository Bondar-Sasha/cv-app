import {StyledButton} from '@/Shared'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {InnerWrapper} from './StyledComponents'
import AllSkills from './AllSkills'

// Add load data

const SkillsPage = () => {
  const {t} = useTranslation()
  return (
    <InnerWrapper>
      <StyledButton>
        <AddIcon style={{marginRight: '8px'}} /> {t('Add skill')}
      </StyledButton>
      <AllSkills />
    </InnerWrapper>
  )
}

export default SkillsPage
