import {gql, useMutation} from '@apollo/client'
import type {Cv, UpdateCvSkillInput} from 'cv-graphql'

export type UpdateCvSkillArgs = {
  skill: UpdateCvSkillInput
}

export type UpdateCvSkillResult = {
  data: Cv
}

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`

export const useUpdateCvSkill = () => {
  return useMutation<UpdateCvSkillResult, UpdateCvSkillArgs>(UPDATE_CV_SKILL)
}
