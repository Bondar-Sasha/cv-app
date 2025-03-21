import {gql, useQuery} from '@apollo/client'
import {Project} from 'cv-graphql'

const PROJECTS = gql`
  query Projects {
    projects {
      id
      name
      description
      domain
      start_date
      end_date
      environment
    }
  }
`

export const useProjects = () => {
  return useQuery<{projects: Project[]}>(PROJECTS)
}
