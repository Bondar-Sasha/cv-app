import {
  CloseButton,
  CustomSelectComponent,
  Form,
  FormBox,
  StyledButton,
  Title,
} from '@/Shared'
import {createPortal} from 'react-dom'
import {useTranslation} from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import {ButtonContainer, Overlay} from './StyledComponents'
import {FC, useState} from 'react'
import {SelectChangeEvent} from '@mui/material'
import {Mastery} from 'cv-graphql'

interface FormOverProps {
  onClose: () => void
  title: string
  mutateFunc: (skill: string, skillMaster: Mastery) => void
  firstSelectValue: string
  firstSelectOptions: TransformedArray[]
  firstSelectTitle: string
  secondSelectValue: Mastery
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
  const [secondSelects, setSecondSelects] = useState<Mastery>(secondSelectValue)

  const handleClose = () => {
    onClose()
  }

  const handleChangeFirstSelect = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as Mastery
    if (!isNaN(Number(value))) {
      return
    }
    setFirstSelects(value)
  }
  const handleChangeSecondSelect = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as Mastery
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
            <StyledButton
              sx={(theme) => ({
                minWidth: '220px',
                height: '48px',
                borderColor: theme.palette.text.secondary,
              })}
              variant="outlined"
              onClick={handleClose}
            >
              {t('Cancel')}
            </StyledButton>
            <StyledButton
              sx={(theme) => ({
                minWidth: '220px',
                height: '48px',
                borderColor: theme.palette.text.secondary,
              })}
              disabled={!firstSelects}
              variant="contained"
              onClick={() => void handleMutateData()}
            >
              {t('Confirm')}
            </StyledButton>
          </ButtonContainer>
        </Form>
      </FormBox>
    </Overlay>,
    document.body
  )
}
export default FormOver
