import {gql, useQuery} from '@apollo/client'
import {Cv} from 'cv-graphql'

export type IdArgs = {
  cvId: string
}

export type SkillsCvResult = {
  cv: Cv
}

export const GET_CV_SKILLS = gql`
  query GetCvSkills($cvId: ID!) {
    cv(cvId: $cvId) {
      name
      skills {
        name
        categoryId
        mastery
      }
    }
  }
`

export const useGetCvSkills = (cvId: string) => {
  return useQuery<SkillsCvResult, IdArgs>(GET_CV_SKILLS, {
    variables: {cvId},
  })
}
