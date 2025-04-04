import {gql, useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

export type IdArgs = {
  userId: string
}

export type LanguagesResult = {
  user: User
}

export const GET_USER_LANGUAGES = gql`
  query GetLanguages($userId: ID!) {
    user(userId: $userId) {
      profile {
        full_name
        languages {
          name
          proficiency
        }
      }
    }
  }
`

export const useGetUserLanguages = (userId: string) => {
  return useQuery<LanguagesResult, IdArgs>(GET_USER_LANGUAGES, {
    variables: {userId},
  })
}
