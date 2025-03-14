import {
  CloseButton,
  CvForm,
  CvFormType,
  CvShema,
  Form,
  FormBox,
  Title,
} from '@/Shared'
import {Backdrop} from '@mui/material'
import CVsFormButton from './CVsFormButton'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'
import {useForm} from 'react-hook-form'
import {FC, useEffect, useState} from 'react'
import {getCurrentUserID} from '@/App'
import {useCreateCv} from '../api/useCreateCv'
import {toast} from 'react-toastify'
import {zodResolver} from '@hookform/resolvers/zod'

interface BackdropFormProps {
  setOpen: (open: boolean) => void
  isOpen: boolean
}

const BackdropForm: FC<BackdropFormProps> = ({isOpen, setOpen}) => {
  const {t} = useTranslation()
  const userId = getCurrentUserID()
  const [isDisabled, setIsDisabled] = useState(true)

  const [initialValues] = useState<CvFormType>({
    name: '',
    education: '',
    description: '',
  })

  const handleClose = () => {
    reset()
    setOpen(false)
  }

  const [mutateCreateCv] = useCreateCv()

  const handleCreateCv = (formData: CvFormType) => {
    mutateCreateCv({
      variables: {cv: {userId, ...formData}},
      onError: (error) => {
        toast(error.message)
      },
      onCompleted: () => {
        toast('CV was created')
        handleClose()
      },
    }).catch((error) => {
      console.error('Create cv failed', error)
    })
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
    reset,
    watch,
  } = useForm<CvFormType>({
    resolver: zodResolver(CvShema),
  })

  const watchedFields = watch()

  useEffect(() => {
    const isChanged = (Object.keys(watchedFields) as (keyof CvFormType)[]).some(
      (field) => watchedFields[field] !== initialValues[field]
    )
    setIsDisabled(!isChanged)
  }, [watchedFields, initialValues])

  return (
    <Backdrop
      sx={(theme) => ({
        color: 'rgba(0, 0, 0, 0.5)',
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isOpen}
      onClick={handleClose}
    >
      <FormBox
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <Form>
          <CloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <Title variant="h2">{t('Create CV')}</Title>

          <CvForm
            submitMutate={handleSubmit(handleCreateCv)}
            register={register}
            errors={errors}
            buttons={
              <CVsFormButton
                handleClose={handleClose}
                isDisabled={isDisabled}
              />
            }
          />
        </Form>
      </FormBox>
    </Backdrop>
  )
}

export default BackdropForm
