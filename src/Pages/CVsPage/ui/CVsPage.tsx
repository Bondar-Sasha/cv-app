import {LoaderBackdrop, NoFoundCell, useDebounceSearch} from '@/Shared'
import {Paper, Table, TableBody} from '@mui/material'
import {useState} from 'react'
import BackdropForm from './BackdropForm'
import CustomTableHead from './CustomTableHead'
import CVRow from './CVRow'
import {CustomTableContainer, TableBox} from './StyledComponents'
import {useSorting} from '../hooks/useSorting'
import {useFetchCVs} from '../api/useGetAllCvs'
import {Cv} from 'cv-graphql'

export type SortTypes = 'asc' | 'desc'

const CVsPage = () => {
  const [isOpenForm, setOpenForm] = useState(false)
  const [searchState, setSearchState] = useState('')

  const debouncedSearchState = useDebounceSearch(searchState)
  const {data, loading, refetch, employee} = useFetchCVs()

  const filteredCVs: Cv[] =
    data?.user?.cvs?.filter((cv: Cv) =>
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
      <CustomTableContainer component={Paper}>
        <Table sx={{width: '100%'}} stickyHeader>
          <CustomTableHead
            setOpenForm={setOpenForm}
            searchState={searchState}
            setSearchState={setSearchState}
            sortState={sortState}
            onSort={handleSort}
          />

          <TableBody
            sx={(theme) => ({
              backgroundColor: theme.palette.background.default,
            })}
          >
            {sortedCVs.length > 0 ? (
              sortedCVs.map((cv) => (
                <CVRow
                  key={cv.id as string | number}
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
      </CustomTableContainer>

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
