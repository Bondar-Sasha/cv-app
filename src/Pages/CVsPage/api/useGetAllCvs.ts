import {getCurrentUserID} from '@/App'
import {gql, useQuery} from '@apollo/client'
import {User} from 'cv-graphql'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'

export type IdArgs = {
  userId: string
}

export type CvsResult = {
  user: User
}

export const GET_CVS = gql`
  query GetCvs($userId: ID!) {
    user(userId: $userId) {
      email
      cvs {
        id
        name
        education
        description
      }
    }
  }
`

export const useFetchCVs = () => {
  const userId = getCurrentUserID()
  const {data, loading, error, refetch} = useQuery<CvsResult, IdArgs>(GET_CVS, {
    variables: {userId},
    fetchPolicy: 'no-cache',
  })
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
