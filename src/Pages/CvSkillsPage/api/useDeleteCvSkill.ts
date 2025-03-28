import {gql, useMutation} from '@apollo/client'
import type {Cv, DeleteCvSkillInput} from 'cv-graphql'

export type DeleteCvSkillArgs = {
  skill: DeleteCvSkillInput
}

export type DeleteCvSkillResult = {
  data: Cv
}

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`

export const useDeleteCvSkill = () => {
  return useMutation<DeleteCvSkillResult, DeleteCvSkillArgs>(DELETE_CV_SKILL)
}
