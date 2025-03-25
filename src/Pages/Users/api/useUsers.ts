import {gql, useQuery} from '@apollo/client'
import {useMemo} from 'react'

export interface ReceivedUser {
  users: {
    id: string
    email: string
    department?: {
      name: string
    }
    position?: {
      name: string
    }
    profile: {
      first_name: string
      last_name: string
      avatar: string
    }
  }[]
}

export interface PreparedUser {
  id: string
  email: string
  department?: string

  position?: string

  first_name: string
  last_name: string
  avatar: string
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
  const {data, ...helpers} = useQuery<ReceivedUser>(USERS)
  const preparedData: PreparedUser[] | null = useMemo(() => {
    if (!data) {
      return null
    }
    return data.users.map(
      ({
        profile: {last_name, first_name, avatar},
        department,
        position,
        ...userData
      }) => {
        return {
          ...userData,
          last_name,
          first_name,
          avatar,
          department: department?.name,
          position: position?.name,
        }
      }
    )
  }, [data])

  return {...helpers, data: preparedData}
}
