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

export const useAddCvProject = () => {
  return useMutation<AddCvProjectResult, AddCvProjectArgs>(ADD_CV_PROJECT)
}
