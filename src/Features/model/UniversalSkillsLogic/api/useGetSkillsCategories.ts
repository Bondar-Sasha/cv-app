import {gql, useQuery} from '@apollo/client'
import {Skill} from 'cv-graphql'

export type SkillsResult = {
  skills: [Skill]
}

export const GET_SKILLS_CATEGORIES = gql`
  query GetSkillsCategories {
    skills {
      name
      category {
        id
        name
      }
      category_name
      category_parent_name
    }
  }
`

export const useGetSkillsCategories = () => {
  return useQuery<SkillsResult>(GET_SKILLS_CATEGORIES)
}
