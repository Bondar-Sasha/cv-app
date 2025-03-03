import {CustomSelectComponent} from '@/Shared'
import {createPortal} from 'react-dom'
import {useTranslation} from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import {
  ButtonContainer,
  CloseButton,
  Form,
  FormBox,
  Overlay,
  Title,
} from './StyledComponents'
import StyledButtonWrapper from './StyledButtonWrapper'
import {FC} from 'react'

export const ThemeOptions = [
  {value: 'Skill', label: 'Skill'},
  {value: 'Novice', label: 'Novice'},
]

interface FormOverProps {
  onClose: () => void
}

const FormOver: FC<FormOverProps> = ({onClose}) => {
  const {t} = useTranslation()

  const handleClose = () => {
    onClose()
  }

  const handleChangeLanguage = () => {}

  return createPortal(
    <Overlay>
      <FormBox as="form">
        <Form>
          <CloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <Title variant="h2">{t('Add skill')}</Title>
          <CustomSelectComponent
            value="Skill"
            onChange={handleChangeLanguage}
            options={ThemeOptions}
            label="Skill"
          />
          <CustomSelectComponent
            value="Novice"
            onChange={handleChangeLanguage}
            options={ThemeOptions}
            label="Skill mastery"
          />
          <ButtonContainer>
            <StyledButtonWrapper title="Cancel" />
            <StyledButtonWrapper title="Confirm" />
          </ButtonContainer>
        </Form>
      </FormBox>
    </Overlay>,
    document.body
  )
}
export default FormOver
