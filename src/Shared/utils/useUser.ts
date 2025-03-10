import {useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

import {USER} from '../schemas'

interface GetUserArgs {
  userId: string
}
interface ReceivedUser {
  user: User
}

export const useUser = () => {
  const userId = localStorage.getItem('userId') || ''
  const {data, ...fetchingUserMetrics} = useQuery<ReceivedUser, GetUserArgs>(
    USER,
    {
      skip: !userId,
      fetchPolicy: 'cache-first',
      variables: {
        userId,
      },
    }
  )

  return {
    ...fetchingUserMetrics,
    user: data?.user,
  }
}
