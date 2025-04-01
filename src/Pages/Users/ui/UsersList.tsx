import {FC} from 'react'

import {PreparedUser} from '../api/useUsers'
import UserRow from './UserRow'

interface UsersListProps {
  listData: PreparedUser[]
}

const UsersList: FC<UsersListProps> = ({listData}) => {
  return (
    <>
      {listData.map((user) => {
        const {department, position, ...userInf} = user
        return (
          <UserRow
            {...userInf}
            key={userInf.id}
            department={department || ''}
            position={position || ''}
          />
        )
      })}
    </>
  )
}

export default UsersList
