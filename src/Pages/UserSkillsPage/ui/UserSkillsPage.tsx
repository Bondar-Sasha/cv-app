import {OneUserLayout} from '@/Features'
import UserAllSkills from './UserAllSkills'

const UserSkillsPage = () => {
  return <OneUserLayout path="skills" page={<UserAllSkills />} />
}

export default UserSkillsPage
