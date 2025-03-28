import {getCurrentUserID} from '@/App'
import {LanguagesPageLogic} from '@/Entities'

const LanguagesPage = () => {
  const userId = getCurrentUserID()

  return <LanguagesPageLogic userId={userId} />
}

export default LanguagesPage
