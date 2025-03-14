import {StyledButton} from '@/Shared'
import {Box} from '@mui/material'
import {useState} from 'react'
import BackdropForm from './BackdropForm'

const CVsPage = () => {
  const [isOpen, setOpen] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: 'max-content',
      }}
    >
      <StyledButton
        onClick={() => setOpen(true)}
        variant="text"
        children={'Create CV'}
      />

      <BackdropForm isOpen={isOpen} setOpen={setOpen} />
    </Box>
  )
}

export default CVsPage
