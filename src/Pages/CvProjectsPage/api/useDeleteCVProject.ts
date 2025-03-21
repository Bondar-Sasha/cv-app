import {CV} from '@/Features'
import {gql, useMutation} from '@apollo/client'
import {Cv, RemoveCvProjectInput} from 'cv-graphql'

export type DeleteCvProjectArgs = {
  project: RemoveCvProjectInput
}

export type DeleteCvProjectResult = {
  cv: Cv
}

export const DELETE_CV_PROJECT = gql`
  mutation DeleteCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
    }
  }
`

export const useDeleteCVProject = (cvId?: string) => {
  return useMutation<DeleteCvProjectResult, DeleteCvProjectArgs>(
    DELETE_CV_PROJECT,
    {
      refetchQueries: cvId ? [{query: CV, variables: {cvId}}] : [],
    }
  )
}
