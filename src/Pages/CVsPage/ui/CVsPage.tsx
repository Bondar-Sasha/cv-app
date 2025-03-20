import {LoaderBackdrop, NoFoundCell} from '@/Shared'
import {Paper, Table, TableBody, TableContainer} from '@mui/material'
import {useState} from 'react'
import BackdropForm from './BackdropForm'
import CustomTableHead from './CustomTableHead'
import CVRow from './CVRow'
import {TableBox} from './StyledComponents'
import {useDebounce} from '../hooks/useDebaunced'
import {useSorting} from '../hooks/useSorting'
import {useFetchCVs} from '../api/useGetAllCvs'

export type SortTypes = 'asc' | 'desc'

const CVsPage = () => {
  const [isOpenForm, setOpenForm] = useState(false)
  const [searchState, setSearchState] = useState('')

  const debouncedSearchState = useDebounce(searchState)
  const {data, loading, refetch, employee} = useFetchCVs()

  const filteredCVs =
    data?.user?.cvs?.filter((cv) =>
      cv.name.toLowerCase().includes(debouncedSearchState.toLowerCase())
    ) || []

  const {
    sortedData: sortedCVs,
    sortState,
    handleSort,
  } = useSorting(filteredCVs, 'name')

  if (loading) {
    return <LoaderBackdrop loading={loading} />
  }

  return (
    <TableBox>
      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Table sx={{tableLayout: 'fixed', width: '100%'}} stickyHeader>
          <CustomTableHead
            setOpenForm={setOpenForm}
            searchState={searchState}
            setSearchState={setSearchState}
            sortState={sortState}
            onSort={handleSort}
          />

          <TableBody>
            {sortedCVs.length > 0 ? (
              sortedCVs.map((cv) => (
                <CVRow
                  key={cv.id}
                  cv={cv}
                  employee={employee}
                  refetch={refetch}
                />
              ))
            ) : (
              <NoFoundCell reset={() => setSearchState('')} />
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {isOpenForm && (
        <BackdropForm
          isOpen={isOpenForm}
          setOpen={setOpenForm}
          refetch={() => void refetch()}
        />
      )}
    </TableBox>
  )
}

export default CVsPage
