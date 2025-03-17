import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {useGetAllCvs} from '../api/useGetAllCvs'
import {getCurrentUserID} from '@/App'

export const useFetchCVs = () => {
  const userID = getCurrentUserID()
  const {data, loading, error, refetch} = useGetAllCvs(userID)
  const [employee, setEmployee] = useState('')

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    } else if (data) {
      setEmployee(data.user.email)
    }
  }, [data, error])

  return {data, loading, error, refetch, employee}
}
