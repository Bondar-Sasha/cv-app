import {useEffect} from 'react'
import {useGetUserLanguages} from '../api/useGetUserLanguages'
import {getCurrentUserID} from '@/App'
import {toast} from 'react-toastify'

const useUserLanguages = () => {
  const userId = getCurrentUserID()
  const {loading, error, data, refetch} = useGetUserLanguages(userId)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  return {loading, error, data, refetch}
}

export default useUserLanguages
