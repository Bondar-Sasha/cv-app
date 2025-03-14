import {FC, RefObject} from 'react'
import {useVirtualizer} from '@tanstack/react-virtual'

import {PreparedUser} from '../api/useUsers'
import UserRow from './UserRow'

interface UsersListProps {
  listData?: PreparedUser[] | null
  parentRef: RefObject<HTMLTableSectionElement>
}

const UsersList: FC<UsersListProps> = ({listData, parentRef}) => {
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
}

export default UsersList
