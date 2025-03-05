import {gql, useLazyQuery, useMutation} from '@apollo/client'
import {useEffect, useState} from 'react'
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
  const userId = localStorage.getItem('userId')
  const refreshToken = localStorage.getItem('refreshToken')

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [getTokens, {data: tokensData}] = useMutation<Tokens>(UPDATE_TOKENS, {
    client,
  })

  const [getUser] = useLazyQuery<ReceivedUser, GetUserArgs>(USER, {client})

  useEffect(() => {
    const fetchTokens = async () => {
      if (!userId || !refreshToken) {
        return
      }
      try {
        const {data} = await getTokens()
        if (data) {
          client.setLink(preparedApolloLink(data.updateToken.access_token))
          await getUser({
            client,
            variables: {userId: userId as string | number},
          })
        }
      } catch (error) {
        localStorage.removeItem('userId')
        localStorage.removeItem('refreshToken')
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchTokens()
  }, [getTokens, getUser, refreshToken, userId])

  return {
    accessToken: tokensData?.updateToken.access_token,
    isFetching: isLoading,
  }
}
