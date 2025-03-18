import {StyledButton} from '@/Shared'
import {FC} from 'react'
import {BoxCustom} from './StyledComponents'

interface CVsFormButtonProps {
  handleClose: () => void
  isDisabled: boolean
  titleBtn: string
  mutate?: () => void
}

const CVsFormButton: FC<CVsFormButtonProps> = ({
  handleClose,
  isDisabled,
  titleBtn,
  mutate,
}) => {
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
        children={titleBtn}
        disabled={isDisabled}
        sx={{maxWidth: '40%', height: '50px'}}
        onClick={mutate}
      />
    </BoxCustom>
  )
}

export default CVsFormButton
