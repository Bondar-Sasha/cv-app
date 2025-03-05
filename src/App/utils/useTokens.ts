import {gql, useLazyQuery, useMutation} from '@apollo/client'
import {useEffect} from 'react'
import {UpdateTokenResult, User} from 'cv-graphql'

import {client} from '../providers/ApolloClient'

const UPDATE_TOKENS = gql`
  mutation UpdateToken {
    updateToken {
      refresh_token
      access_token
    }
  }
`
const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
    }
  }
`

interface Tokens {
  updateToken: UpdateTokenResult
}
interface GetUserArgs {
  userId: string | number
}
interface ReceivedUser {
  user: User
}

export const useTokens = () => {
  const userId = localStorage.getItem('userId')
  const refreshToken = localStorage.getItem('refreshToken')

  const [getTokens, tokensFetchingOptions] = useMutation<Tokens>(
    UPDATE_TOKENS,
    {
      client,
      context: {
        headers: {
          authorization: `Bearer ${refreshToken}`,
        },
      },
    }
  )
  const [getUser, userFetchingOptions] = useLazyQuery<
    ReceivedUser,
    GetUserArgs
  >(USER, {client})

  useEffect(() => {
    if (!userId || !refreshToken) {
      return
    }
    async function tokensThenUser() {
      try {
        const tokensData = await getTokens()
        if (tokensData.data) {
          await getUser({
            variables: {userId: userId as string | number},
            context: {
              headers: {
                authorization: `Bearer ${tokensData.data.updateToken.access_token}`,
              },
            },
          })
        }
      } catch (error) {
        localStorage.removeItem('userId')
        localStorage.removeItem('refreshToken')
        console.error(error)
      }
    }
    void tokensThenUser()
  }, [getTokens, getUser, refreshToken, userId])

  return {
    accessToken: tokensFetchingOptions.data?.updateToken.access_token,
    refreshToken: tokensFetchingOptions.data?.updateToken.refresh_token,
    isFetching: tokensFetchingOptions.loading || userFetchingOptions.loading,
  }
}
