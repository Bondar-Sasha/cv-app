import {FC, useEffect, useMemo, useRef, useState, useTransition} from 'react'
import {
  Box,
  InputAdornment,
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
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useNavigate} from 'react-router-dom'

import {useUsers} from '../api'
import {CircleProgress, AppRouterMap} from '@/Shared'
import {PreparedUser} from '../api/useUsers'
import UsersList from './UsersList'
import {
  CustomArrow,
  CustomIconButton,
  CustomTdCell,
  CustomTextField,
} from './preparedUi'

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
  const [, startTransition] = useTransition()

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedSearch(filtersState.searchState)
      })
    }, 300)

    return () => {
      clearTimeout(handler)
    }
  }, [filtersState.searchState, startTransition])

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
    <main>
      <Table sx={{bgcolor: 'inherit', color: 'inherit'}}>
        <Box
          component={TableHead}
          position="sticky"
          top="0px"
          height="58px"
          zIndex="100"
          bgcolor="inherit"
        >
          <TableRow>
            <TableCell colSpan={7} sx={{border: 'none', padding: 0}}>
              <Box display="flex" alignItems="end" height="50px" width="100%">
                <CustomTextField
                  variant="outlined"
                  value={filtersState.searchState}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchState: e.target.value,
                    }))
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
            </TableCell>
          </TableRow>
          <TableRow>
            <CustomTdCell width="80px"></CustomTdCell>
            {THeadItems.map((item) => (
              <CustomTdCell
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
              </CustomTdCell>
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
                  <Button disabled>{t('Delete user')}</Button>
                </Box>
              </Popover>
            </CustomTdCell>
          </Box>
          <UsersList listData={filteredData} parentRef={tbodyRef} />
        </TableBody>
      </Table>
    </main>
  )
}

export default UsersPage
