import {gql, useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

export type IdArgs = {
  userId: string
}

export type LanguagesResult = {
  user: User
}

export const GET_LANGUAGES = gql`
  query GetLanguages($userId: ID!) {
    user(userId: $userId) {
      profile {
        languages {
          name
          proficiency
        }
      }
    }
  }
`

export const useGetLanguages = (userId: string) => {
  return useQuery<LanguagesResult, IdArgs>(GET_LANGUAGES, {
    variables: {userId},
  })
}
