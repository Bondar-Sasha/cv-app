import {OneUserLayout} from '@/Features'
import {ProfilePage} from '@/Pages/Profile'

const UserProfilePage = () => {
  return <OneUserLayout path="profile" page={<ProfilePage />} />
}

export default UserProfilePage
