import {gql, useMutation} from '@apollo/client'
import type {DeleteCvInput, DeleteResult} from 'cv-graphql'

export type DeleteCvArgs = {
  cv: DeleteCvInput
}

export type DeleteCvResult = {
  data: DeleteResult
}

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`

export const useDeleteCv = (cvId: string) => {
  return useMutation<DeleteCvResult, DeleteCvArgs>(DELETE_CV, {
    variables: {cv: {cvId}},
  })
}
