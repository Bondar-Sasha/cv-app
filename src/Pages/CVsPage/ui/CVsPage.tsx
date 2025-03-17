import {LoaderBackdrop} from '@/Shared'
import {Paper, Table, TableBody, TableContainer} from '@mui/material'
import {useEffect, useState} from 'react'
import BackdropForm from './BackdropForm'
import {getCurrentUserID} from '@/App'
import {useGetAllCvs} from '../api/useGetAllCvs'
import {toast} from 'react-toastify'
import CustomTableHead from './CustomTableHead'
import CVRow from './CVRow'
import {TableBox} from './StyledComponents'

const CVsPage = () => {
  const userID = getCurrentUserID()
  const [isOpenForm, setOpenForm] = useState(false)
  const [employee, setEmployee] = useState('')
  const {data, loading, error, refetch} = useGetAllCvs(userID)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    } else if (data) {
      setEmployee(data.user.email)
    }
  }, [data, error])

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
        <Table sx={{tableLayout: 'fixed', width: '100%'}}>
          <CustomTableHead setOpenForm={setOpenForm} />

          <TableBody>
            {data?.user?.cvs?.map((cv) => (
              <CVRow
                key={cv.id}
                cv={cv}
                employee={employee}
                refetch={refetch}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <BackdropForm
        isOpen={isOpenForm}
        setOpen={setOpenForm}
        refetch={() => void refetch()}
      />
    </TableBox>
  )
}

export default CVsPage
