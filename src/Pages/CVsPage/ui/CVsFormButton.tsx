import {StyledButton} from '@/Shared'
import {FC} from 'react'
import {BoxCustom} from './StyledComponents'
import {useTranslation} from 'react-i18next'

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
  const {t} = useTranslation()
  return (
    <BoxCustom>
      <StyledButton
        children={t('Cancel')}
        variant="outlined"
        onClick={handleClose}
        sx={{maxWidth: '40%', height: '50px'}}
      />
      <StyledButton
        type="submit"
        variant="contained"
        children={t(titleBtn)}
        disabled={isDisabled}
        sx={{maxWidth: '40%', height: '50px'}}
        onClick={mutate}
      />
    </BoxCustom>
  )
}

export default CVsFormButton
