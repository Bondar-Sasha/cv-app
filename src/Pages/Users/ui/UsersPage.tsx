import {FC, useCallback, useEffect, useMemo, useRef, useState} from 'react'
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
  Button,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import {useTranslation} from 'react-i18next'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useNavigate} from 'react-router-dom'
import {debounce} from 'lodash'

import {useUsers} from '../api'
import {CircleProgress, AppRouterMap} from '@/Shared'
import {PreparedUser} from '../api/useUsers'
import UsersList from './UsersList'

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
  paddingRight: 0,
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
  return (curFilter: Filters['currentFilter']['id'], filterState: boolean) => {
    return (str: string): PreparedUser[] | null | undefined => {
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
}

const UsersPage: FC = () => {
  const theme = useTheme()
  const {data, loading} = useUsers()
  const {t} = useTranslation()
  const navigate = useNavigate()
  const tbodyRef = useRef<HTMLTableSectionElement | null>(null)
  const [popoverState, setPopover] = useState<boolean>(false)
  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'first_name',
      state: false,
    },
  })
  const popoverAnchor = useRef<HTMLButtonElement | null>(null)

  const [debouncedSearchState, setDebouncedSearch] = useState(
    filtersState.searchState
  )

  const updateDebouncedSearchState = useCallback((searchTerm: string) => {
    debounce(() => {
      setDebouncedSearch(searchTerm)
    }, 300)()
  }, [])

  useEffect(() => {
    const handler = setTimeout(() => {
      updateDebouncedSearchState(filtersState.searchState)
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [filtersState.searchState, updateDebouncedSearchState])

  const filteredData = useMemo(() => {
    return filterFunc(data)(
      filtersState.currentFilter.id,
      filtersState.currentFilter.state
    )(debouncedSearchState)
  }, [
    data,
    debouncedSearchState,
    filtersState.currentFilter.id,
    filtersState.currentFilter.state,
  ])
  const toggleFilter = (id: Filters['currentFilter']['id']) => {
    setFilters((prev) => ({
      searchState: prev.searchState,
      currentFilter: {
        id,
        state: prev.currentFilter.id === id ? !prev.currentFilter.state : true,
      },
    }))
  }

  if (loading) {
    return (
      <Box
        width="100%"
        height="50%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <CircleProgress />
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
        <TableBody ref={tbodyRef}>
          <Box component={TableRow} height="73px">
            <CustomTdCell colSpan={6}>
              <CustomIconButton
                ref={popoverAnchor}
                onClick={() => setPopover((prev) => !prev)}
              >
                <MoreVertIcon />
              </CustomIconButton>
              <Popover
                anchorEl={popoverAnchor.current}
                open={popoverState}
                onClose={() => setPopover(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <Box
                  width="210px"
                  display="flex"
                  flexDirection="column"
                  color={theme.palette.text.primary}
                  bgcolor={theme.palette.background.default}
                >
                  <Button
                    color="inherit"
                    onClick={() =>
                      void navigate(AppRouterMap.userProfile.path('32'))
                    }
                  >
                    {t('Profile')}
                  </Button>
                  <Button color="inherit">{t('Update user')}</Button>
                  <Button color="inherit">{t('Delete user')}</Button>
                </Box>
              </Popover>
            </CustomTdCell>
          </Box>
          <UsersList listData={filteredData} parentRef={tbodyRef} />
        </TableBody>
      </CustomTable>
    </>
  )
}

export default UsersPage
