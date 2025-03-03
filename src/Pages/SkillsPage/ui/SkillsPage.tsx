import {LoaderBackdrop, StyledButton} from '@/Shared'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {InnerWrapper} from '../../ui/StyledComponents'
import {AllSkills, FormOver} from '@/Features'
import {useGetSkills} from '../api/getSkills'
import {getUser} from '@/App'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'

// Add load data

const skillsObject = [
  {
    id: 0,
    part: 'Programming languages',
    elements: [
      {name: 'JavaScript', size: 20},
      {name: 'TypeScript', size: 40},
      {name: 'Node', size: 60},
    ],
  },
  {
    id: 1,
    part: 'Frontend',
    elements: [
      {name: 'HTML5', size: 20},
      {name: 'CSS3', size: 80},
      {name: 'React', size: 100},
    ],
  },
]

const SkillsPage = () => {
  const {t} = useTranslation()
  const user = getUser()
  const {loading, error, data} = useGetSkills(user.id)

  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (error) {
      toast(error.message)
    }
  }, [error])

  if (loading) {
    return <LoaderBackdrop loading />
  }

  return (
    <InnerWrapper>
      {open && <FormOver onClose={handleClose} title="Add skill" />}

      {data?.user.profile.skills.length === 0 ? (
        <StyledButton onClick={handleClick}>
          <AddIcon style={{marginRight: '8px'}} /> {t('Add skill')}
        </StyledButton>
      ) : (
        <AllSkills dataObject={skillsObject} />
      )}
    </InnerWrapper>
  )
}

export default SkillsPage
