import {CV} from '@/Features'
import {gql, useMutation} from '@apollo/client'
import type {Cv, UpdateCvProjectInput} from 'cv-graphql'

export type UpdateCvProjectArgs = {
  project: UpdateCvProjectInput
}

export type UpdateCvProjectResult = {
  cv: Cv
}

export const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
    }
  }
`

export const useUpdateCvProject = (cvId?: string) => {
  return useMutation<UpdateCvProjectResult, UpdateCvProjectArgs>(
    UPDATE_CV_PROJECT,
    {
      refetchQueries: cvId ? [{query: CV, variables: {cvId}}] : [],
    }
  )
}
