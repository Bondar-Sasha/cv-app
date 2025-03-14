import {useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

import {USER} from '../schemas'

interface GetUserArgs {
  userId: string
}
interface ReceivedUser {
  user: User
}

export const useUser = (userId?: string) => {
  const id = userId || localStorage.getItem('userId') || ''
  const {data, ...fetchingUserMetrics} = useQuery<ReceivedUser, GetUserArgs>(
    USER,
    {
      skip: !id,
      fetchPolicy: 'cache-first',
      variables: {
        userId: id,
      },
    }
  )

  return {
    ...fetchingUserMetrics,
    user: data?.user,
  }
}
