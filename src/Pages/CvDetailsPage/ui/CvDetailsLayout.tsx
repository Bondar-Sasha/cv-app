import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {zodResolver} from '@hookform/resolvers/zod'
import {Box, BoxProps, FormControl, styled} from '@mui/material'
import {InnerWrapper} from '@/Pages/ui'
import {CustomTextField, LoaderBackdrop, StyledButton} from '@/Shared'
import {useGetCvDetails} from '../api/useGetCvDetails'
import {createCvDetailsForm, CvDetailsShema} from '../api/CvDetailsShema'
import {useUpdateCvDetails} from '../api/useUpdateCvDetails'
import {FormFieldsData} from '../utilits/FormFieldsData'

const BoxCustom = styled(Box)<BoxProps>(() => ({
  width: '100%',
}))

const CvDetailsLayout = () => {
  const {cvId = ''} = useParams()
  const {data, loading, error} = useGetCvDetails(cvId)
  const [isDisabled, setIsDisabled] = useState(true)
  const [initialValues, setInitialValues] = useState<createCvDetailsForm>({
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
  } = useForm<createCvDetailsForm>({
    defaultValues: initialValues,
    resolver: zodResolver(CvDetailsShema),
  })

  useEffect(() => {
    if (data) {
      const newValues = {
        name: data.cv.name,
        education: data.cv.education || '',
        description: data.cv.description,
      }
      reset(newValues)
      setInitialValues(newValues)
    }
  }, [data, reset])

  const watchedFields = watch()

  useEffect(() => {
    const isChanged = (
      Object.keys(watchedFields) as (keyof createCvDetailsForm)[]
    ).some((field) => watchedFields[field] !== initialValues[field])
    setIsDisabled(!isChanged)
  }, [watchedFields, initialValues])

  useEffect(() => {
    if (error) {
      toast(error.message)
    }
  }, [error])

  const [mutateUpdate, {data: UpdateData}] = useUpdateCvDetails()

  const handleUpdateCvDetails = (formData: createCvDetailsForm) => {
    mutateUpdate({
      variables: {cv: {cvId, ...formData}},
      onError: (error) => {
        toast(error.message)
      },
      onCompleted: () => {
        toast('CV was updated')
      },
    }).catch((error) => {
      console.error('Update cv failed', error)
    })
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
      <BoxCustom
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(handleUpdateCvDetails)}
      >
        <FormControl sx={{width: '100%'}}>
          {FormFieldsData.map((field) => (
            <CustomTextField
              type="text"
              key={field.id}
              register={register}
              errors={errors}
              {...field}
            />
          ))}
          <StyledButton
            type="submit"
            variant="contained"
            children="Update"
            disabled={isDisabled}
            sx={{marginTop: '25px', width: '50%', alignSelf: 'flex-end'}}
          />
        </FormControl>
      </BoxCustom>
    </InnerWrapper>
  )
}

export default CvDetailsLayout
