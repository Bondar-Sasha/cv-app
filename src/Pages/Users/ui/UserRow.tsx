import {FC, memo, useCallback} from 'react'
import {Box, TableRow} from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import {useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

import {AppRouterMap, EnvUserLogo} from '@/Shared'
import {CustomIconButton, CustomTdCell} from './preparedUi'

interface UserRowProps {
  id: string
  email: string
  department: string
  position: string
  first_name: string
  last_name: string
  avatar: string
}

const UserRow: FC<UserRowProps> = memo(
  ({id, first_name, last_name, email, department, position, avatar}) => {
    const {t} = useTranslation()
    const navigate = useNavigate()

    const handleNavigate = useCallback(() => {
      void navigate(AppRouterMap.userProfile.path(id))
    }, [navigate, id])

    return (
      <Box component={TableRow} height="73px">
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
        <CustomTdCell>{t(department)}</CustomTdCell>
        <CustomTdCell>{t(position)}</CustomTdCell>
        <CustomTdCell>
          <CustomIconButton onClick={handleNavigate}>
            <ArrowForwardIosIcon />
          </CustomIconButton>
        </CustomTdCell>
      </Box>
    )
  }
)

export default UserRow
