import {CV} from '@/Features'
import {gql, useMutation} from '@apollo/client'
import type {AddCvProjectInput, Cv} from 'cv-graphql'

export type AddCvProjectArgs = {
  project: AddCvProjectInput
}

export type AddCvProjectResult = {
  cv: Cv
}

export const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      name
      education
      description
    }
  }
`

export const useAddCvProject = (cvId?: string) => {
  return useMutation<AddCvProjectResult, AddCvProjectArgs>(ADD_CV_PROJECT, {
    refetchQueries: cvId ? [{query: CV, variables: {cvId}}] : [],
  })
}
