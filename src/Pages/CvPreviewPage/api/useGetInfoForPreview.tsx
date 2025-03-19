import {gql, useQuery} from '@apollo/client'
import {Cv} from 'cv-graphql'

export type CvInfoResult = {
  cv: Cv
}

export type IdArgs = {
  cvId: string
}

export const GET_CV_INFO = gql`
  query GetCvInfo($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      projects {
        project {
          id
          name
          internal_name
          description
          domain
          start_date
          end_date
          environment
        }
        responsibilities
      }
    }
  }
`

export const useGetCvInfoForDetails = (cvId: string) => {
  return useQuery<CvInfoResult, IdArgs>(GET_CV_INFO, {
    variables: {cvId},
  })
}
