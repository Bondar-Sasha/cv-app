import {gql, useQuery} from '@apollo/client'
import {User} from 'cv-graphql'

export type IdArgs = {
  userId: string
}

export type SkillsResult = {
  user: User
}

export const GETSKILLS = gql`
  query GetSkills($userId: ID!) {
    user(userId: $userId) {
      email
      department {
        name
      }
      position {
        name
      }
      profile {
        full_name
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
    }
  }
`

export const useGetSkills = (userId?: string) => {
  return useQuery<SkillsResult, IdArgs>(GETSKILLS, {
    skip: !userId,
    variables: {userId: userId!},
  })
}
