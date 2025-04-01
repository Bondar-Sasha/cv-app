import {OneUserLayout} from '@/Features'
import {ProfilePage} from '@/Widgets'

const UserProfilePage = () => {
  return <OneUserLayout path="profile" page={<ProfilePage />} />
}

export default UserProfilePage
