import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {zodResolver} from '@hookform/resolvers/zod'
import {InnerWrapper} from '@/Pages/ui'
import {
  CvForm,
  CvFormType,
  CvShema,
  LoaderBackdrop,
  StyledButton,
} from '@/Shared'
import {useGetCvDetails} from '../api/useGetCvDetails'
import {useUpdateCvDetails} from '../api/useUpdateCvDetails'
import {useTranslation} from 'react-i18next'
import {useBreadCrumbsContext} from '@/App'

const CvDetailsLayout = () => {
  const {t} = useTranslation()
  const {cvId = ''} = useParams()
  const {data, loading, error, refetch} = useGetCvDetails(cvId)
  const [isDisabled, setIsDisabled] = useState(true)
  const breadcrumb = useBreadCrumbsContext()
  const [initialValues, setInitialValues] = useState<CvFormType>({
    name: '',
    education: '',
    description: '',
  })

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<CvFormType>({
    defaultValues: initialValues,
    resolver: zodResolver(CvShema),
  })

  useEffect(() => {
    if (data) {
      const newValues = {
        name: data.cv.name,
        education: data.cv.education || '',
        description: data.cv.description,
      }
      breadcrumb.setCurrentBread(data.cv.name)
      reset(newValues)
      setInitialValues(newValues)
    }
  }, [breadcrumb, data, reset])

  const watchedFields = watch()

  useEffect(() => {
    const isChanged = (Object.keys(watchedFields) as (keyof CvFormType)[]).some(
      (field) => watchedFields[field] !== initialValues[field]
    )
    setIsDisabled(!isChanged)
  }, [watchedFields, initialValues])

  useEffect(() => {
    if (error) {
      toast(error.message)
    }
  }, [error])

  const [mutateUpdate, {data: UpdateData}] = useUpdateCvDetails()
  const handleUpdateCvDetails = async (formData: CvFormType) => {
    try {
      await mutateUpdate({
        variables: {cv: {cvId, ...formData}},
      })
      await refetch()
      toast.success('CV was updated')
    } catch (error) {
      console.error('Update cv failed', error)
    }
  }

  useEffect(() => {
    if (UpdateData) {
      setIsDisabled(true)
    }
  }, [UpdateData, isDisabled])

  if (loading) {
    return <LoaderBackdrop loading />
  }

  return (
    <InnerWrapper>
      <CvForm
        submitMutate={handleSubmit(handleUpdateCvDetails)}
        register={register}
        errors={errors}
        buttons={
          <StyledButton
            type="submit"
            variant="contained"
            children={t('Update')}
            disabled={isDisabled}
            sx={{marginTop: '25px', width: '50%'}}
          />
        }
      />
    </InnerWrapper>
  )
}

export default CvDetailsLayout
