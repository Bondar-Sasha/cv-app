import {gql, useMutation} from '@apollo/client'
import type {Cv, UpdateCvInput} from 'cv-graphql'

export type UpdateCvDetailsArgs = {
  cv: UpdateCvInput
}

export type UpdateCvDetailsResult = {
  cv: Cv
}

export const UPDATE_CV_DETAILS = gql`
  mutation UpdateCvDetails($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      name
      education
      descriptions
    }
  }
`

export const useUpdateCvDetails = () => {
  return useMutation<UpdateCvDetailsResult, UpdateCvDetailsArgs>(
    UPDATE_CV_DETAILS
  )
}
