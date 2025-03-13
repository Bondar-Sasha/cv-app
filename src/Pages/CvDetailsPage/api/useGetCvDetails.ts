import {gql, useQuery} from '@apollo/client'
import {Cv} from 'cv-graphql'

export type CvDetailsResult = {
  cv: Cv
}

export type IdArgs = {
  cvId: string
}

export const GET_CV_DETAILS = gql`
  query GetCvDetails($cvId: ID!) {
    cv(cvId: $cvId) {
      name
      education
      description
    }
  }
`

export const useGetCvDetails = (cvId: string) => {
  return useQuery<CvDetailsResult, IdArgs>(GET_CV_DETAILS, {
    variables: {cvId},
  })
}
