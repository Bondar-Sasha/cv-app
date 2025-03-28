import {gql, useMutation} from '@apollo/client'
import type {AuthInput, AuthResult} from 'cv-graphql'
import {useEffect} from 'react'

import {reactiveRefreshToken} from '@/Shared'

export type SignupArgs = {
  auth: AuthInput
}

export type SignupResult = {
  signup: AuthResult
}

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
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

export const useSignup = () => {
  const signUpHandlers = useMutation<SignupResult, SignupArgs>(SIGNUP)

  const signUpFetchingData = signUpHandlers[1]

  useEffect(() => {
    if (!signUpFetchingData.data) {
      return
    }
    reactiveRefreshToken(signUpFetchingData.data.signup.refresh_token)
    localStorage.setItem(
      'refreshToken',
      signUpFetchingData.data.signup.refresh_token
    )
    localStorage.setItem('userId', signUpFetchingData.data.signup.user.id)
  }, [signUpFetchingData.data])

  return signUpHandlers
}
