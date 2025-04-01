import {OneUserLayout} from '@/Features'
import UserAllSkills from './UserAllSkills'
import {getCurrentUserID} from '@/App'
import {useParams} from 'react-router-dom'
import {SkillsPage} from '@/Pages/SkillsPage'

const UserSkillsPage = () => {
  const userID = getCurrentUserID()
  const {userId} = useParams()

  if (userId === userID) {
    return (
      <OneUserLayout
        path="skills"
        page={<SkillsPage />}
        sx={{margin: '0', maxWidth: '100%'}}
      />
    )
  }

  return <OneUserLayout path="skills" page={<UserAllSkills />} />
}

export default UserSkillsPage
