import {FC, useState} from 'react'
import {Box, IconButton, InputAdornment, styled, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {useTranslation} from 'react-i18next'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material'

import {useUsers} from '../api'
import {AppRouterMap, CircleProgress, EnvUserLogo} from '@/Shared'
import {useNavigate} from 'react-router-dom'

const CustomTextField = styled(TextField)(({theme}) => ({
  zIndex: 100,
  width: '320px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      border: '1px solid rgba(153, 153, 153, 0.5)',
      borderRadius: '20px',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(78, 78, 78, 0.5)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    height: '43px',
    padding: '0 14px',
  },
}))

const CustomCell = styled(TableCell)({
  cursor: 'pointer',
})
const CustomIconButton = styled(IconButton)({
  zIndex: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
    zIndex: 0,
  },
})

interface Filters {
  searchState: string
  currentFilter: {
    id: 'firstName' | 'lastName' | 'email' | 'department' | 'position'
    state: boolean
  }
}

interface THeadItem {
  id: Filters['currentFilter']['id']
  label: string
}

const THeadItems: THeadItem[] = [
  {id: 'firstName', label: 'First Name'},
  {id: 'lastName', label: 'Last Name'},
  {id: 'email', label: 'Email'},
  {id: 'department', label: 'Department'},
  {id: 'position', label: 'Position'},
]

interface CustomArrowProps {
  arrowState: boolean | null
}

const CustomArrow = styled(ArrowUpwardIcon, {
  shouldForwardProp: (prop) => prop !== 'arrowState',
})<CustomArrowProps>(({arrowState}) => ({
  color: 'inherit',
  fontSize: '12px',
  marginLeft: '7px',
  cursor: 'pointer',
  visibility: arrowState === null ? 'hidden' : 'visible',
  transform: arrowState ? 'rotate(0deg)' : 'rotate(180deg)',
}))

const UsersPage: FC = () => {
  const navigate = useNavigate()
  const {data, loading} = useUsers()
  const {t} = useTranslation()

  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'firstName',
      state: false,
    },
  })

  const toggleFilter = (id: Filters['currentFilter']['id']) => {
    setFilters({
      searchState: filtersState.searchState,
      currentFilter: {
        id,
        state:
          filtersState.currentFilter.id === id
            ? !filtersState.currentFilter.state
            : true,
      },
    })
  }

  if (loading) {
    return (
      <Box
        width="100%"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircleProgress />
      </Box>
    )
  }
  if (!data) {
    return (
      <Box
        width="100%"
        height="300px"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        There are no users
      </Box>
    )
  }

  return (
    <>
      <Box
        position="sticky"
        top="44px"
        zIndex="100"
        bgcolor="inherit"
        display="flex"
        alignItems="end"
        height="50px"
      >
        <CustomTextField
          variant="outlined"
          value={filtersState.searchState}
          onChange={(e) =>
            setFilters({...filtersState, searchState: e.target.value})
          }
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="inherit" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Box component={Table} bgcolor="inherit">
        <Box
          component={TableHead}
          position="sticky"
          top="94px"
          height="58px"
          zIndex="100"
          bgcolor="inherit"
        >
          <TableRow>
            <TableCell width="80px"></TableCell>
            {THeadItems.map((item) => (
              <CustomCell
                align="left"
                key={item.id}
                onClick={() => toggleFilter(item.id)}
              >
                <span>{t(item.label)}</span>
                <CustomArrow
                  arrowState={
                    filtersState.currentFilter.id === item.id
                      ? filtersState.currentFilter.state
                      : null
                  }
                />
              </CustomCell>
            ))}
            <TableCell width="80px"></TableCell>
          </TableRow>
        </Box>
        <TableBody>
          <TableRow style={{height: '73px'}}>
            <TableCell>
              <EnvUserLogo latter={'d'} />
            </TableCell>
            <TableCell>{'dwdw'}</TableCell>
            <TableCell>{'dwdw'}</TableCell>
            <TableCell>{'dwdw'}</TableCell>
            <TableCell>{'dwdw'}</TableCell>
            <TableCell>{'dwdw'}</TableCell>
            <TableCell>
              {
                <CustomIconButton>
                  <MoreVertIcon />
                </CustomIconButton>
              }
            </TableCell>
          </TableRow>
          {data.users.map(({id, ...user}) => (
            <TableRow key={id} style={{height: '73px'}}>
              <TableCell>
                {user.profile.avatar ? (
                  <Box
                    component="img"
                    src={user.profile.avatar}
                    alt="User Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '20px',
                    }}
                  ></Box>
                ) : (
                  <EnvUserLogo latter={user.email[0]} />
                )}
              </TableCell>
              <TableCell>{user.profile.first_name}</TableCell>
              <TableCell>{user.profile.last_name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.department?.name}</TableCell>
              <TableCell>{user.position?.name}</TableCell>
              <TableCell>
                {
                  <CustomIconButton
                    onClick={() => {
                      void navigate(AppRouterMap.userProfile.path(443))
                    }}
                  >
                    <ArrowForwardIosIcon />
                  </CustomIconButton>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Box>
    </>
  )
}

export default UsersPage
