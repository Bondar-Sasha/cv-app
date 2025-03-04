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
import {TransformedSkill} from '@/Pages/SkillsPage/model/addCategoryAndProficiencyToUserSkills'
import {MasteryOptions} from './model/MasteryOptions'

interface FormOverProps {
  onClose: () => void
  title: string
  dataForSelect: TransformedSkill[]
  addFunc: (
    transformArray: TransformedArray[],
    skill: string,
    skillMaster: string
  ) => void
}

export interface TransformedArray {
  category?: string
  id?: string
  label: string
  value: string
}

const FormOver: FC<FormOverProps> = ({
  onClose,
  title,
  addFunc,
  dataForSelect,
}) => {
  const {t} = useTranslation()
  const [skillMaster, setSkillMaster] = useState('Novice')
  const [skill, setSkill] = useState('')

  const transformArray: TransformedArray[] = []
  dataForSelect.map((elem) => {
    transformArray.push({value: '0', label: elem.category})
    transformArray.push(...elem.technologies)
  })

  const handleClose = () => {
    onClose()
  }

  const handleChangeSkill = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string
    if (!isNaN(Number(value))) {
      return
    }
    setSkill(value)
  }
  const handleChangeSkillMastery = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string
    setSkillMaster(value)
  }

  const handleAddSkill = () => {
    addFunc(transformArray, skill, skillMaster)
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
            options={transformArray}
            label="Skill"
          />

          <CustomSelectComponent
            disabled={!skill}
            value={skillMaster}
            onChange={handleChangeSkillMastery}
            options={MasteryOptions}
            label="Skill mastery"
          />
          <ButtonContainer>
            <StyledButtonWrapper onClick={handleClose} title="Cancel" />
            <StyledButtonWrapper
              disabled={!skill}
              title="Confirm"
              onClick={() => void handleAddSkill()}
            />
          </ButtonContainer>
        </Form>
      </FormBox>
    </Overlay>,
    document.body
  )
}
export default FormOver
