import {useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

import {USER} from '../schemas'

export interface GetUserArgs {
  userId: string
}
export interface ReceivedUser {
  user: User
}

export const useUser = (userId?: string) => {
  const id = userId || localStorage.getItem('userId') 
  const {data, ...fetchingUserMetrics} = useQuery<ReceivedUser, GetUserArgs>(
    USER,
    {
      skip: !id,
      fetchPolicy: 'cache-and-network',
      variables: {
        userId: id!,
      },
    }
  )

  return {
    ...fetchingUserMetrics,
    user: data?.user,
  }
}
