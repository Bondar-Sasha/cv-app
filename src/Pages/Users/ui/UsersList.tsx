import {FC, memo} from 'react'
import {Box, TableRow, TableCell, styled, IconButton} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

import {PreparedUser} from '../api/useUsers'
import {AppRouterMap, EnvUserLogo} from '@/Shared'

interface UsersListProps {
  listData?: PreparedUser[] | null
}

const CustomTdCell = styled(TableCell)({
  textOverflow: 'ellipsis',
  border: 'none',
  maxWidth: '300px',
})

const CustomIconButton = styled(IconButton)({
  zIndex: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '14px',
    zIndex: 0,
  },
})

const UsersList: FC<UsersListProps> = memo(
  ({listData}) => {
    const navigate = useNavigate()
    const {t} = useTranslation()

    if (!listData) {
      return (
        <Box
          width="100%"
          height="50%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {t('There are no users')}
        </Box>
      )
    }

    return (
      <>
        {listData.map(
          ({
            id,
            first_name,
            last_name,
            email,
            department,
            position,
            avatar,
          }) => (
            <Box component={TableRow} key={id} height="73px">
              <CustomTdCell>
                {avatar ? (
                  <Box
                    component="img"
                    src={avatar}
                    alt="User Avatar"
                    width="40px"
                    height="40px"
                    borderRadius="20px"
                  />
                ) : (
                  <EnvUserLogo latter={email[0]} />
                )}
              </CustomTdCell>
              <CustomTdCell>{t(first_name)}</CustomTdCell>
              <CustomTdCell>{t(last_name)}</CustomTdCell>
              <CustomTdCell>{t(email)}</CustomTdCell>
              <CustomTdCell>{department && t(department)}</CustomTdCell>
              <CustomTdCell>{position && t(position)}</CustomTdCell>
              <CustomTdCell>
                <CustomIconButton
                  onClick={() => {
                    void navigate(AppRouterMap.userProfile.path(id))
                  }}
                >
                  <ArrowForwardIosIcon />
                </CustomIconButton>
              </CustomTdCell>
            </Box>
          )
        )}
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
