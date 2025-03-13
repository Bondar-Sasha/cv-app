import {
  CloseButton,
  CustomSelectComponent,
  Form,
  FormBox,
  Title,
} from '@/Shared'
import {createPortal} from 'react-dom'
import {useTranslation} from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import {ButtonContainer, Overlay} from './StyledComponents'
import StyledButtonWrapper from './StyledButtonWrapper'
import {FC, useState} from 'react'
import {SelectChangeEvent} from '@mui/material'

interface FormOverProps {
  onClose: () => void
  title: string
  mutateFunc: (skill: string, skillMaster: string) => void
  firstSelectValue: string
  firstSelectOptions: TransformedArray[]
  firstSelectTitle: string
  secondSelectValue: string
  secondSelectOptions: {value: string; label: string}[]
  secondSelectTitle: string
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
  mutateFunc,
  firstSelectValue,
  firstSelectOptions,
  firstSelectTitle,
  secondSelectValue,
  secondSelectOptions,
  secondSelectTitle,
}) => {
  const {t} = useTranslation()
  const [firstSelects, setFirstSelects] = useState(firstSelectValue)
  const [secondSelects, setSecondSelects] = useState(secondSelectValue)

  const handleClose = () => {
    onClose()
  }

  const handleChangeFirstSelect = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string
    if (!isNaN(Number(value))) {
      return
    }
    setFirstSelects(value)
  }
  const handleChangeSecondSelect = (event: SelectChangeEvent<unknown>) => {
    const value = event.target.value as string
    setSecondSelects(value)
  }

  const handleMutateData = () => {
    mutateFunc(firstSelects, secondSelects)
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
            disabled={!!title.includes('Update')}
            value={firstSelects}
            onChange={handleChangeFirstSelect}
            options={firstSelectOptions}
            label={firstSelectTitle}
          />

          <CustomSelectComponent
            disabled={!firstSelects}
            value={secondSelects}
            onChange={handleChangeSecondSelect}
            options={secondSelectOptions}
            label={secondSelectTitle}
          />
          <ButtonContainer>
            <StyledButtonWrapper onClick={handleClose} title="Cancel" />
            <StyledButtonWrapper
              disabled={!firstSelects}
              title="Confirm"
              onClick={() => void handleMutateData()}
            />
          </ButtonContainer>
        </Form>
      </FormBox>
    </Overlay>,
    document.body
  )
}
export default FormOver
