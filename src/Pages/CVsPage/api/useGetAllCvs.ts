import {getCurrentUserID} from '@/App'
import {gql, useQuery} from '@apollo/client'
import {User} from 'cv-graphql'
import {useEffect, useMemo} from 'react'
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

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
  }, [error])

  const employee = useMemo(
    () => (!error && data ? data.user.email : null),
    [error, data]
  )

  return {data, loading, error, refetch, employee}
}
