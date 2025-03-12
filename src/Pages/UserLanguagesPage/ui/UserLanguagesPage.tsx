import {LanguagesPageLogic} from '@/Entities'
import {OneUserLayout} from '@/Features'
import {useParams} from 'react-router-dom'

const UserLanguagesPage = () => {
  const ID = useParams().userId || ''

  return (
    <OneUserLayout
      path="languages"
      sx={{margin: '0', maxWidth: '100%'}}
      page={<LanguagesPageLogic userId={ID} />}
    />
  )
}

export default UserLanguagesPage
