import {
  LoaderBackdrop,
  NoFoundCell,
  SearchInput,
  useDebounceSearch,
  useUser,
} from '@/Shared'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import {useCallback, useMemo, useState} from 'react'
import BackdropForm from './BackdropForm'
import AddIcon from '@mui/icons-material/Add'
import CVRow from './CVRow'
import {CustomTableContainer, CustomTblHead, TableBox} from './StyledComponents'
import {WrapperButton} from '@/Features'
import {useTranslation} from 'react-i18next'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import {Navigate} from 'react-router-dom'
import {filterFunc} from '../utils/filterFunc'

interface Filters {
  searchState: string
  currentFilter: {
    id: 'name' | 'education'
    state: boolean
  }
}

interface THeadItem {
  id: Filters['currentFilter']['id']
  label: string
}

const THeadItems: THeadItem[] = [
  {id: 'name', label: 'Name'},
  {id: 'education', label: 'Education'},
]

const CVsPage = () => {
  const {t} = useTranslation()
  const [isOpenForm, setOpenForm] = useState(false)
  const {user, loading, refetch} = useUser()
  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'name',
      state: false,
    },
  })
  const debouncedSearchState = useDebounceSearch(filtersState.searchState, 500)

  const filteredData = useMemo(() => {
    return filterFunc(user?.cvs)(
      filtersState.currentFilter.id,
      filtersState.currentFilter.state
    )(debouncedSearchState)
  }, [
    debouncedSearchState,
    filtersState.currentFilter.id,
    filtersState.currentFilter.state,
    user?.cvs,
  ])

  const toggleFilter = (id: Filters['currentFilter']['id']) => {
    setFilters((prev) => ({
      ...prev,
      currentFilter: {
        id,
        state: prev.currentFilter.id === id ? !prev.currentFilter.state : true,
      },
    }))
  }

  const resetSearch = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      searchState: '',
    }))
  }, [setFilters])

  if (loading) {
    return <LoaderBackdrop loading />
  }

  if (!filteredData) {
    return <Navigate to="/" />
  }

  return (
    <TableBox>
      <CustomTableContainer component={Paper}>
        <Table sx={{width: '100%'}} stickyHeader>
          <CustomTblHead>
            <TableRow>
              <TableCell sx={{borderBottom: 'none'}} colSpan={2}>
                <SearchInput
                  placeholder={`${t('Search')}...`}
                  value={filtersState.searchState}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      searchState: e.target.value,
                    }))
                  }
                  reset={resetSearch}
                />
              </TableCell>
              <TableCell sx={{borderBottom: 'none'}}>
                <WrapperButton
                  onClick={() => setOpenForm(true)}
                  color="rgb(198, 48, 49)"
                >
                  <AddIcon style={{marginRight: '14px'}} /> {t('Create CV')}
                </WrapperButton>
              </TableCell>
            </TableRow>
            <TableRow>
              {THeadItems.map((item) => (
                <TableCell
                  key={item.id}
                  onClick={() => toggleFilter(item.id)}
                  sx={{cursor: 'pointer'}}
                >
                  <Box display="flex" alignItems="center" whiteSpace="nowrap">
                    <Typography variant="subtitle1" fontWeight="500">
                      {t(item.label)}
                    </Typography>
                    <ArrowUpwardIcon
                      sx={{
                        marginLeft: '7px',
                        visibility:
                          item.id === filtersState.currentFilter.id
                            ? 'visible'
                            : 'hidden',
                        transform: filtersState.currentFilter.state
                          ? 'rotate(180deg)'
                          : 'none',
                        transition: 'transform 0.2s ease',
                        fontSize: '15px',
                      }}
                    />
                  </Box>
                </TableCell>
              ))}

              <TableCell sx={{display: 'flex', alignItems: 'center'}}>
                <Typography variant="subtitle1" fontWeight="500">
                  {t('Employee')}
                </Typography>
              </TableCell>
            </TableRow>
          </CustomTblHead>

          <TableBody
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
            })}
          >
            {filteredData.length > 0 ? (
              filteredData.map((cv) => (
                <CVRow
                  key={cv.id}
                  cv={cv}
                  employee={user?.profile.first_name || ''}
                  refetch={refetch}
                />
              ))
            ) : (
              <NoFoundCell reset={resetSearch} />
            )}
          </TableBody>
        </Table>
      </CustomTableContainer>

      {isOpenForm && (
        <BackdropForm
          isOpen={isOpenForm}
          setOpen={setOpenForm}
          refetch={refetch}
        />
      )}
    </TableBox>
  )
}

export default CVsPage
