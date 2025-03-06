import {gql, useLazyQuery, useMutation} from '@apollo/client'
import {useCallback, useEffect, useState} from 'react'
import {UpdateTokenResult, User} from 'cv-graphql'

import {client, preparedApolloLink} from '../providers/ApolloClient'

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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [getTokens, {data: tokensData}] = useMutation<Tokens>(UPDATE_TOKENS, {
    client,
    fetchPolicy: 'no-cache',
  })

  const [getUser] = useLazyQuery<ReceivedUser, GetUserArgs>(USER, {client})

  const handleGetTokens = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        return
      }
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
  }, [getTokens])

  useEffect(() => {
    void (async () => {
      try {
        const userId = localStorage.getItem('userId')

        if (!userId) {
          return
        }
        setIsLoading(true)
        const accessToken = await handleGetTokens()

        if (!accessToken) {
          return
        }
        client.setLink(preparedApolloLink(accessToken))
        const {data} = await getUser({
          client,
          variables: {userId: userId as string | number},
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
  }, [getUser, handleGetTokens])

  const refetchTokens = useCallback(() => {
    handleGetTokens().catch((error) => console.error(error))
  }, [handleGetTokens])

  return {
    accessToken: tokensData?.updateToken.access_token,
    isFetching: isLoading,
    refetchTokens,
  }
}
