import {makeVar} from '@apollo/client'

export const reactiveRefreshToken = makeVar(
  localStorage.getItem('refreshToken')
)
