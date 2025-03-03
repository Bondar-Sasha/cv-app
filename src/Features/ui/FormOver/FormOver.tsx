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
import {FC, useState} from 'react'
import {SelectChangeEvent} from '@mui/material'

export const SkillMasteryOptions = [
  {value: 'Novice', label: 'Novice'},
  {value: 'Advanced', label: 'Advanced'},
  {value: 'Competent', label: 'Competent'},
  {value: 'Proficient', label: 'Proficient'},
  {value: 'Expert', label: 'Expert'},
]

export const SkillOptions = [{value: 'JavaScript', label: 'JavaScript'}]

interface FormOverProps {
  onClose: () => void
  title: string
}

const FormOver: FC<FormOverProps> = ({onClose, title}) => {
  const {t} = useTranslation()
  const [skillMaster, setSkillMaster] = useState('Novice')
  const [skill, setSkill] = useState('')

  const handleClose = () => {
    onClose()
  }

  const handleChangeSkill = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string
    setSkill(value)
  }
  const handleChangeSkillMastery = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string
    setSkillMaster(value)
  }

  return createPortal(
    <Overlay onClick={handleClose}>
      <FormBox
        as="form"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <Form>
          <CloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <Title variant="h2">{t(title)}</Title>
          <CustomSelectComponent
            value={skill}
            onChange={handleChangeSkill}
            options={SkillOptions}
            label="Skill"
          />
          <CustomSelectComponent
            disabled={!skill}
            value={skillMaster}
            onChange={handleChangeSkillMastery}
            options={SkillMasteryOptions}
            label="Skill mastery"
          />
          <ButtonContainer>
            <StyledButtonWrapper onClick={handleClose} title="Cancel" />
            <StyledButtonWrapper title="Confirm" />
          </ButtonContainer>
        </Form>
      </FormBox>
    </Overlay>,
    document.body
  )
}
export default FormOver
