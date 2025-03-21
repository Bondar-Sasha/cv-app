import {FC, useMemo, useRef, useState} from 'react'
import {
  Box,
  TableBody,
  TableRow,
  TableCell,
  Popover,
  TableContainer,
  Paper,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useNavigate} from 'react-router-dom'

import {useUsers} from '../api'
import {
  AppRouterMap,
  useUser,
  EnvUserLogo,
  SearchInput,
  LoaderBackdrop,
  useDebounceSearch,
  NoFoundCell,
} from '@/Shared'
import {PreparedUser} from '../api/useUsers'
import UsersList from './UsersList'
import {
  ButtonWrapper,
  CustomIconButton,
  CustomTable,
  CustomTableButton,
  CustomTableHead,
  CustomTdCell,
  CustomThCell,
} from './preparedUi'
import UpdateProfilePopup from './UpdateProfilePopup'
import {CustomArrow} from '@/Pages/ui'

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
  const {user} = useUser()
  const {data, loading} = useUsers()
  const {t} = useTranslation()
  const navigate = useNavigate()
  const tbodyRef = useRef<HTMLTableSectionElement | null>(null)
  const [popoverState, setPopover] = useState<boolean>(false)
  const [popupState, setPopup] = useState<boolean>(false)
  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'first_name',
      state: false,
    },
  })
  const popoverAnchor = useRef<HTMLButtonElement | null>(null)

  const debouncedSearchState = useDebounceSearch(filtersState.searchState, 500)

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

  const resetSearch = () => {
    setFilters((prev) => ({
      ...prev,
      searchState: '',
    }))
  }

  if (loading) {
    return <LoaderBackdrop loading />
  }

  return (
    <main>
      <UpdateProfilePopup
        open={popupState}
        onClose={() => {
          setPopup(false)
        }}
      />
      <TableContainer
        component={Paper}
        sx={(theme) => ({
          backgroundColor: theme.palette.background.default,
          boxShadow: 'none',
          maxHeight: '100vh',
          paddingRight: '40px',
        })}
      >
        <CustomTable stickyHeader>
          <CustomTableHead>
            <TableRow>
              <TableCell
                colSpan={7}
                sx={{
                  borderBottom: 'none',
                  padding: 0,
                  paddingLeft: '20px',
                  paddingBottom: '7px',
                  '@media (width <= 768px)': {
                    paddingLeft: '0',
                  },
                }}
              >
                <Box display="flex" alignItems="end" height="50px" width="100%">
                  <SearchInput
                    variant="outlined"
                    value={filtersState.searchState}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        searchState: e.target.value,
                      }))
                    }
                    placeholder="Search..."
                    reset={resetSearch}
                  />
                </Box>
              </TableCell>
            </TableRow>
            <TableRow>
              <CustomThCell width="80px"></CustomThCell>
              {THeadItems.map((item) => (
                <CustomThCell
                  align="left"
                  key={item.id}
                  onClick={() => toggleFilter(item.id)}
                  sx={{cursor: 'pointer'}}
                >
                  <Box
                    display="flex"
                    alignItems="center"
                    fontSize="15px"
                    whiteSpace="nowrap"
                  >
                    <span>{t(item.label)}</span>
                    <CustomArrow
                      arrowState={
                        filtersState.currentFilter.id === item.id
                          ? filtersState.currentFilter.state
                          : null
                      }
                    />
                  </Box>
                </CustomThCell>
              ))}
              <CustomThCell width="80px"></CustomThCell>
            </TableRow>
          </CustomTableHead>

          <TableBody ref={tbodyRef}>
            <Box component={TableRow} height="73px">
              <Popover
                anchorEl={popoverAnchor.current}
                open={popoverState}
                onClose={() => setPopover(false)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
              >
                <ButtonWrapper>
                  <CustomTableButton
                    onClick={() =>
                      void navigate(AppRouterMap.userProfile.path(user?.id))
                    }
                  >
                    {t('Profile')}
                  </CustomTableButton>
                  <CustomTableButton
                    onClick={() => {
                      setPopover(false)
                      setPopup(true)
                    }}
                  >
                    {t('Update user')}
                  </CustomTableButton>
                  <CustomTableButton disabled>
                    {t('Delete user')}
                  </CustomTableButton>
                </ButtonWrapper>
              </Popover>

              <CustomTdCell>
                <EnvUserLogo
                  latter={
                    user?.profile.first_name?.charAt(0) || user?.email[0] || ''
                  }
                  src={user?.profile?.avatar}
                />
              </CustomTdCell>
              <CustomTdCell>{user?.profile?.first_name}</CustomTdCell>
              <CustomTdCell>{user?.profile?.last_name}</CustomTdCell>
              <CustomTdCell>{user?.email}</CustomTdCell>
              <CustomTdCell>{user?.department?.name}</CustomTdCell>
              <CustomTdCell>{user?.position?.name}</CustomTdCell>
              <CustomTdCell>
                <CustomIconButton
                  ref={popoverAnchor}
                  onClick={() => setPopover((prev) => !prev)}
                >
                  <MoreVertIcon />
                </CustomIconButton>
              </CustomTdCell>
            </Box>
            {filteredData?.length ? (
              <UsersList listData={filteredData} parentRef={tbodyRef} />
            ) : (
              <NoFoundCell
                reset={() =>
                  setFilters((prev) => ({
                    ...prev,
                    searchState: '',
                  }))
                }
              />
            )}
            <TableRow>
              <TableCell colSpan={6} />
            </TableRow>
          </TableBody>
        </CustomTable>
      </TableContainer>
    </main>
  )
}

export default UsersPage
