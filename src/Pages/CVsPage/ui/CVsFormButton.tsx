import {StyledButton} from '@/Shared'
import {Box, BoxProps, styled} from '@mui/material'
import {FC} from 'react'

const BoxCustom = styled(Box)<BoxProps>(() => ({
  display: 'flex',
  gap: '10px',
  width: '100%',
  justifyContent: 'flex-end',
  marginTop: '30px',
}))

interface CVsFormButtonProps {
  handleClose: () => void
  isDisabled: boolean
}

const CVsFormButton: FC<CVsFormButtonProps> = ({handleClose, isDisabled}) => {
  return (
    <BoxCustom>
      <StyledButton
        children="Cancel"
        variant="outlined"
        onClick={handleClose}
        sx={{maxWidth: '40%', height: '50px'}}
      />
      <StyledButton
        type="submit"
        variant="contained"
        children="Create"
        disabled={isDisabled}
        sx={{maxWidth: '40%', height: '50px'}}
      />
    </BoxCustom>
  )
}

export default CVsFormButton
