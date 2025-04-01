import {gql, useMutation} from '@apollo/client'
import type {CreateCvInput, Cv} from 'cv-graphql'

export type CreateCvArgs = {
  cv: CreateCvInput
}

export type CreateCvResult = {
  cv: Cv
}

export const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      name
      education
      description
      id
    }
  }
`

export const useCreateCv = () => {
  return useMutation<CreateCvResult, CreateCvArgs>(CREATE_CV)
}
