import {
  gql,
  useApolloClient,
  useLazyQuery,
  useMutation,
  useReactiveVar,
} from '@apollo/client'
import {useCallback, useEffect, useState} from 'react'
import {UpdateTokenResult, User} from 'cv-graphql'

import {preparedApolloLink} from '../providers/ApolloClient'
import {reactiveRefreshToken, USER} from '@/Shared'

const UPDATE_TOKENS = gql`
  mutation UpdateToken {
    updateToken {
      refresh_token
      access_token
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
  const client = useApolloClient()

  const refreshToken = useReactiveVar(reactiveRefreshToken)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [getTokens, {data: tokensData}] = useMutation<Tokens>(UPDATE_TOKENS)

  const [getUser] = useLazyQuery<ReceivedUser, GetUserArgs>(USER)

  const handleGetTokens = useCallback(async () => {
    try {
      if (!refreshToken) {
        return
      }
      client.setLink(preparedApolloLink(refreshToken))
      const {data} = await getTokens()
      if (!data) {
        return
      }
      localStorage.setItem('refreshToken', data.updateToken.refresh_token)
      return data.updateToken.access_token
    } catch (error) {
      localStorage.removeItem('refreshToken')
      console.error(error)
    }
  }, [client, getTokens, refreshToken])

  useEffect(() => {
    void (async () => {
      try {
        setIsLoading(true)
        const accessToken = await handleGetTokens()

        if (!accessToken) {
          return
        }
        client.setLink(preparedApolloLink(accessToken))
        const userId = localStorage.getItem('userId')
        const {data} = await getUser({
          variables: {userId: userId as string | number},
          fetchPolicy: 'cache-and-network',
        })
        if (!data) {
          return
        }
        localStorage.setItem('userId', data.user.id)
      } catch (error) {
        localStorage.removeItem('userId')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    })()
  }, [client, getUser, handleGetTokens])

  const refetchTokens = useCallback(() => {
    handleGetTokens().catch((error) => console.error(error))
  }, [handleGetTokens])

  return {
    accessToken: tokensData?.updateToken.access_token,
    isFetching: isLoading,
    refetchTokens,
  }
}
