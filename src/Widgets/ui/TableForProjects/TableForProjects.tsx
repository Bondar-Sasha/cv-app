import {CustomArrow} from '@/Pages'
import {SearchInput, useDebounceSearch} from '@/Shared'
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {FC, ReactNode, useMemo, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {filterFunc} from './utils/sort'
import {CvProject, Project} from 'cv-graphql'
import {NoFoundCell} from '@/Shared'

interface TableForProjectsProps {
  children: (elemProps: CvProject | Project) => ReactNode
  data: (CvProject | Project)[]
  addButton?: ReactNode
}

export interface Filters {
  searchState: string
  currentFilter: {
    id: 'name' | 'domain' | 'end_date' | 'start_date'
    state: boolean
  }
}

interface THeadItem {
  id: Filters['currentFilter']['id']
  label: string
}

const THeadItems: THeadItem[] = [
  {id: 'name', label: 'Name'},
  {id: 'domain', label: 'Domain'},
  {id: 'start_date', label: 'Start Date'},
  {id: 'end_date', label: 'End Date'},
]

const TableForProjects: FC<TableForProjectsProps> = ({
  data,
  addButton,
  children,
}) => {
  const {t} = useTranslation()

  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'name',
      state: false,
    },
  })
  const debouncedSearchState = useDebounceSearch(filtersState.searchState, 500)

  const filteredData = useMemo(() => {
    return filterFunc(data)(debouncedSearchState)(
      filtersState.currentFilter.id,
      filtersState.currentFilter.state
    )
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

  return (
    <TableContainer
      component={Paper}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        boxShadow: 'none',
        maxHeight: '100vh',
        paddingRight: '25px',
      })}
    >
      <Table
        stickyHeader
        sx={{
          tableLayout: 'fixed',
          width: 'unset',
          bgcolor: 'inherit',
          color: 'inherit',
          '& :is(td,th)': {paddingLeft: 0, border: 'none'},
          '& tr:nth-of-type(3n)': {
            '& td': {
              borderBottom: '1px solid',
              borderColor: 'rgba(0, 0, 0, 0.12)',
            },
          },
        }}
      >
        <TableHead
          sx={(theme) => ({
            position: 'sticky',
            top: '0',
            left: '0',
            height: '58px',
            backgroundColor: theme.palette.background.default,
            zIndex: theme.zIndex.drawer + 1,
          })}
        >
          <TableRow sx={{height: '56px'}}>
            <TableCell colSpan={addButton ? 3 : 6}>
              <SearchInput
                reset={() => {
                  setFilters((prev) => ({
                    ...prev,
                    searchState: '',
                  }))
                }}
                value={filtersState.searchState}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    searchState: e.target.value,
                  }))
                }
                variant="outlined"
                placeholder="Search..."
              />
            </TableCell>
            {addButton && (
              <TableCell
                align="right"
                colSpan={3}
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                }}
              >
                {addButton}
              </TableCell>
            )}
          </TableRow>
          <TableRow>
            {THeadItems.map((item) => (
              <TableCell
                align="left"
                key={item.id}
                sx={{cursor: 'pointer'}}
                onClick={() => toggleFilter(item.id)}
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
              </TableCell>
            ))}
            <TableCell sx={{padding: 0, border: 'none'}} width="72px" />
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.length ? (
            filteredData.map((project) => children(project))
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
      </Table>
    </TableContainer>
  )
}

export default TableForProjects
