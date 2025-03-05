import {FC, memo, RefObject} from 'react'
import {useVirtualizer} from '@tanstack/react-virtual'

import {PreparedUser} from '../api/useUsers'
import UserRow from './UserRow'

interface UsersListProps {
  listData?: PreparedUser[] | null
  parentRef: RefObject<HTMLTableSectionElement>
}

const UsersList: FC<UsersListProps> = memo(
  ({listData, parentRef}) => {
    const rowVirtualizer = useVirtualizer({
      count: listData?.length || 0,
      getScrollElement: () => parentRef.current,
      estimateSize: () => 73,
      overscan: 5,
    })

    if (!listData) {
      return null
    }

    return (
      <>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const {department, position, ...userInf} = listData[virtualRow.index]
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
  },
  (prev, cur) => {
    if (prev.listData === cur.listData) return true
    if (!prev.listData || !cur.listData) return false
    if (prev.listData.length !== cur.listData.length) return false

    return prev.listData.every((user, index) => {
      const curUser = cur.listData?.[index] ?? null
      if (!curUser) {
        return false
      }
      return (
        Object.is(user.id, curUser.id) &&
        Object.is(user.first_name, curUser.first_name) &&
        Object.is(user.last_name, curUser.last_name) &&
        Object.is(user.email, curUser.email) &&
        Object.is(user.department, curUser.department) &&
        Object.is(user.position, curUser.position) &&
        Object.is(user.avatar, curUser.avatar)
      )
    })
  }
)

export default UsersList
