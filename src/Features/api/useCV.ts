import {gql, useQuery} from '@apollo/client'
import {Cv} from 'cv-graphql'

const CV = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      user {
        id
      }
      id
      created_at
      name
      education
      description
      projects {
        id
        responsibilities
        name
        description
        domain
        start_date
        end_date
        environment
      }
    }
  }
`

export const useCV = (cvId?: string) => {
  return useQuery<{cv: Cv}>(CV, {variables: {cvId}, skip: !cvId})
}
