import {gql, useMutation} from '@apollo/client'
import type {DeleteProfileSkillInput} from 'cv-graphql'

export type DeleteSkillArgs = {
  skill: DeleteProfileSkillInput
}

export const DELETE_USER_SKILL = gql`
  mutation DeleteUserSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
    }
  }
`

export const useDeleteUserSkill = () => {
  return useMutation<DeleteSkillArgs>(DELETE_USER_SKILL)
}
