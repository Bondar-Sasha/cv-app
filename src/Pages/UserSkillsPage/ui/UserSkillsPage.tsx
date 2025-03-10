import {OneUserLayout} from '@/Features'
import UserAllSkills from './UserAllSkills'
import {getUser} from '@/App'
import {useParams} from 'react-router-dom'
import {SkillsPage} from '@/Pages/SkillsPage'

const UserSkillsPage = () => {
  const userID = getUser().id
  const ID = useParams().userId || ''

  if (ID === userID) {
    return (
      <OneUserLayout
        path="skills"
        page={<SkillsPage />}
        sx={{margin: '0', width: '100%'}}
      />
    )
  }

  return <OneUserLayout path="skills" page={<UserAllSkills />} />
}

export default UserSkillsPage
