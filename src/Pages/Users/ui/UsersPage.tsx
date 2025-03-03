import {FC, useMemo, useRef, useState} from 'react'
import {
  Box,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Popover,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {useTranslation} from 'react-i18next'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useUsers} from '../api'
import {AppRouterMap, CircleProgress, EnvUserLogo} from '@/Shared'
import {useNavigate} from 'react-router-dom'
import {PreparedUser} from '../api/useUsers'

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

const CustomTable = styled(Table)({
  background: 'inherit',
  '@media (max-width: 1260px)': {
    '& :is(td, th):nth-last-of-type(3)': {
      display: 'none',
    },
    '& :is(td, th):nth-last-of-type(2)': {
      display: 'none',
    },
  },
  '@media (max-width: 1080px)': {
    '& :is(td, th):nth-last-of-type(4)': {
      display: 'none',
    },
  },
  '@media (max-width: 480px)': {
    '& :is(td, th):nth-last-of-type(5)': {
      display: 'none',
    },
  },
})

const CustomThCell = styled(TableCell)({
  cursor: 'pointer',
  border: 'none',
})
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

interface Filters {
  searchState: string
  currentFilter: {
    id: 'first_name' | 'last_name' | 'email' | 'department' | 'position'
    state: boolean
  }
}

interface THeadItem {
  id: Filters['currentFilter']['id']
  label: string
}

const THeadItems: THeadItem[] = [
  {id: 'first_name', label: 'First Name'},
  {id: 'last_name', label: 'Last Name'},
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

const filterFunc = (data?: PreparedUser[]) => {
  return (
    str: string,
    curFilter: Filters['currentFilter']['id'],
    filterState: boolean
  ): PreparedUser[] | null | undefined => {
    return (
      data &&
      data
        .filter(
          (user) =>
            (user.first_name || '').includes(str) ||
            (user.last_name || '').includes(str)
        )
        .sort((a, b) => {
          const aValue = a[curFilter]?.toLowerCase() || ''
          const bValue = b[curFilter]?.toLowerCase() || ''

          return filterState
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        })
    )
  }
}

const UsersPage: FC = () => {
  const navigate = useNavigate()
  const {data, loading} = useUsers()
  const {t} = useTranslation()
  const [popoverState, setPopover] = useState<boolean>(false)
  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'first_name',
      state: false,
    },
  })
  const popoverAnchor = useRef<HTMLButtonElement | null>(null)

  const toggleFilter = (id: Filters['currentFilter']['id']) => {
    setFilters((prev) => ({
      searchState: prev.searchState,
      currentFilter: {
        id,
        state: prev.currentFilter.id === id ? !prev.currentFilter.state : true,
      },
    }))
  }

  const filteredData = useMemo(
    () =>
      filterFunc(data)(
        filtersState.searchState,
        filtersState.currentFilter.id,
        filtersState.currentFilter.state
      ),
    [data, filtersState]
  )

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

  if (!filteredData) {
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
            setFilters((prev) => ({...prev, searchState: e.target.value}))
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

      <CustomTable>
        <Box
          component={TableHead}
          position="sticky"
          top="94px"
          height="58px"
          zIndex="100"
          bgcolor="inherit"
        >
          <TableRow>
            <CustomTdCell width="80px"></CustomTdCell>
            {THeadItems.map((item) => (
              <CustomThCell
                align="left"
                key={item.id}
                onClick={() => toggleFilter(item.id)}
                aria-label={`Sort by ${item.label}`}
              >
                <span>{t(item.label)}</span>
                <CustomArrow
                  arrowState={
                    filtersState.currentFilter.id === item.id
                      ? filtersState.currentFilter.state
                      : null
                  }
                />
              </CustomThCell>
            ))}
            <CustomTdCell width="80px"></CustomTdCell>
          </TableRow>
        </Box>
        <TableBody>
          <TableRow style={{height: '73px'}}>
            <CustomTdCell colSpan={6}>
              <CustomIconButton
                ref={popoverAnchor}
                onClick={() => setPopover((prev) => !prev)}
                aria-label="More options"
              >
                <MoreVertIcon />
              </CustomIconButton>
              <Popover
                anchorEl={popoverAnchor.current}
                open={popoverState}
                onClose={() => setPopover(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <span>The content of the Popover.</span>
              </Popover>
            </CustomTdCell>
          </TableRow>
          {filteredData.map(
            ({
              id,
              first_name,
              last_name,
              email,
              department,
              position,
              avatar,
            }) => (
              <TableRow key={id} style={{height: '73px'}}>
                <CustomTdCell>
                  {avatar ? (
                    <Box
                      component="img"
                      src={avatar}
                      alt="User Avatar"
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '20px',
                      }}
                    />
                  ) : (
                    <EnvUserLogo latter={email[0]} />
                  )}
                </CustomTdCell>
                <CustomTdCell>{first_name}</CustomTdCell>
                <CustomTdCell>{last_name}</CustomTdCell>
                <CustomTdCell>{email}</CustomTdCell>
                <CustomTdCell>{department}</CustomTdCell>
                <CustomTdCell>{position}</CustomTdCell>
                <CustomTdCell>
                  <CustomIconButton
                    onClick={() => {
                      void navigate(AppRouterMap.userProfile.path(id))
                    }}
                    aria-label={`Go to profile of ${first_name} ${last_name}`}
                  >
                    <ArrowForwardIosIcon />
                  </CustomIconButton>
                </CustomTdCell>
              </TableRow>
            )
          )}
        </TableBody>
      </CustomTable>
    </>
  )
}

export default UsersPage
