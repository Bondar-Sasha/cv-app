import {StyledButton} from '@/Shared'
import {Box} from '@mui/material'
import {useState} from 'react'
import BackdropForm from './BackdropForm'
import BackDropDelete from './BackDropDelete'

const CVsPage = () => {
  const [isOpenForm, setOpenForm] = useState(false)
  const [isOpenDelete, setOpenDelete] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: 'max-content',
      }}
    >
      <StyledButton
        onClick={() => setOpenForm(true)}
        variant="text"
        children={'Create CV'}
      />

      <StyledButton
        onClick={() => setOpenDelete(true)}
        variant="text"
        children={'Delete CV'}
      />

      <BackdropForm isOpen={isOpenForm} setOpen={setOpenForm} />
      <BackDropDelete
        setOpen={setOpenDelete}
        isOpen={isOpenDelete}
        cvID="Id"
        cvName="Name"
      />
    </Box>
  )
}

export default CVsPage
