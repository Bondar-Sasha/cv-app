import {ApolloQueryResult, makeVar} from '@apollo/client'
import {User} from 'cv-graphql'

interface GetUserArgs {
  userId: string
}
interface ReceivedUser {
  user: User
}

export const refreshUserFunc = makeVar<
  | ((
      variables?: Partial<GetUserArgs>
    ) => Promise<ApolloQueryResult<ReceivedUser>>)
  | null
>(null)
