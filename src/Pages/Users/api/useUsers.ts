import {gql, useQuery} from '@apollo/client'

interface PreparedUser {
  users: {
    id: string
    email: string
    department: {
      name: string
    }
    position: {
      name: string
    }
    profile: {
      first_name: string
      last_name: string
      avatar: string
    }
  }[]
}

export const USERS = gql`
  query users {
    users {
      id
      email
      department {
        name
      }
      position {
        name
      }
      profile {
        first_name
        last_name
        avatar
      }
    }
  }
`

export const useUsers = () => {
  return useQuery<PreparedUser>(USERS)
}
