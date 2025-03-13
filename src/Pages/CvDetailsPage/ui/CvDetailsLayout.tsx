import {InnerWrapper} from '@/Pages/ui'
import {CustomTextField, LoaderBackdrop, StyledButton} from '@/Shared'
import {zodResolver} from '@hookform/resolvers/zod'
import {Box, BoxProps, FormControl, styled} from '@mui/material'
import {useForm} from 'react-hook-form'
import {useParams} from 'react-router-dom'
import {useGetCvDetails} from '../api/useGetCvDetails'
import {useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {createCvDetailsForm, CvDetailsShema} from '../api/CvDetailsShema'
import {useUpdateCvDetails} from '../api/useUpdateCvDetails'
import {FormFieldsData} from '../utilits/FormFieldsData'

export const BoxCustom = styled(Box)<BoxProps>(() => ({
  width: '100%',
}))

const CvDetailsLayout = () => {
  const cvId = useParams().cvId || ''
  const {data, loading, error} = useGetCvDetails(cvId)
  const [isDisabled, setIsDisabled] = useState(true)

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
    reset,
  } = useForm<createCvDetailsForm>({
    defaultValues: {
      name: '',
      education: '',
      description: '',
    },
    resolver: zodResolver(CvDetailsShema),
  })

  const watchedFields = watch()

  useEffect(() => {
    if (data) {
      reset({
        name: data.cv.name,
        education: data.cv.education || '',
        description: data.cv.description,
      })
      setInitialValues({
        name: data.cv.name,
        education: data.cv.education || '',
        description: data.cv.description,
      })
    }
  }, [data, reset])

  const [initialValues, setInitialValues] = useState<createCvDetailsForm>({
    name: '',
    education: '',
    description: '',
  })

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

  const handleUpdateCvDetails = ({
    name,
    education,
    description,
  }: createCvDetailsForm) => {
    mutateUpdate({
      variables: {
        cv: {cvId, name, education, description},
      },
      onError(error) {
        toast(error.message)
      },
      onCompleted() {
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
        component={'form'}
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit((data) => {
          handleUpdateCvDetails(data)
        })}
      >
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          {FormFieldsData.map((field) => (
            <CustomTextField
              key={field.id}
              type="text"
              register={register}
              errors={errors}
              id={field.id}
              label={field.label}
              name={field.name}
              autoComplete={field.autoComplete}
              multiline={field.multiline}
              minRows={field.rows}
            />
          ))}
          <StyledButton
            type="submit"
            variant="contained"
            children={'Update'}
            disabled={isDisabled}
            sx={{marginTop: '25px', width: '50%', alignSelf: 'flex-end'}}
          />
        </FormControl>
      </BoxCustom>
    </InnerWrapper>
  )
}

export default CvDetailsLayout
