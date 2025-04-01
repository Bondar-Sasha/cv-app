import {gql, useLazyQuery} from '@apollo/client'
import type {AuthInput, AuthResult} from 'cv-graphql'
import {useEffect} from 'react'

import {reactiveRefreshToken} from '@/Shared'

export type LoginArgs = {
  auth: AuthInput
}

export type LoginResult = {
  login: AuthResult
}

export const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        profile {
          full_name
        }
        email
      }
      access_token
      refresh_token
    }
  }
`

export const useLogin = () => {
  const loginHandlers = useLazyQuery<LoginResult, LoginArgs>(LOGIN)

  const loginFetchingData = loginHandlers[1]

  useEffect(() => {
    if (!loginFetchingData.data) {
      return
    }
    reactiveRefreshToken(loginFetchingData.data.login.refresh_token)
    localStorage.setItem(
      'refreshToken',
      loginFetchingData.data.login.refresh_token
    )
    localStorage.setItem('userId', loginFetchingData.data.login.user.id)
  }, [loginFetchingData.data])

  return loginHandlers
}
