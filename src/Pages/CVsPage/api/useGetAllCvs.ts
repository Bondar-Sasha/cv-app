import {gql, useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

export type IdArgs = {
  userId: string
}

export type CvsResult = {
  user: User
}

export const GET_CVS = gql`
  query GetCvs($userId: ID!) {
    user(userId: $userId) {
      cvs {
        id
        name
        education
        description
      }
    }
  }
`

export const useGetAllCvs = (userId: string) => {
  return useQuery<CvsResult, IdArgs>(GET_CVS, {
    variables: {userId},
  })
}
