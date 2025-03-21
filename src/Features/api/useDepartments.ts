import {gql, useQuery} from '@apollo/client'
import {Department} from 'cv-graphql'

interface DepartmentsResponse {
  departments: Department[]
}

const ALL_DEPARTMENTS = gql`
  query {
    departments {
      id
      name
    }
  }
`

export const useDepartments = () => {
  const {data, loading, ...helpers} = useQuery<DepartmentsResponse>(
    ALL_DEPARTMENTS,
    {}
  )

  return {
    ...helpers,
    departmentsFetching: loading,
    departments: data?.departments
      ? [...data.departments, {id: '', name: 'No department'}]
      : undefined,
  }
}
