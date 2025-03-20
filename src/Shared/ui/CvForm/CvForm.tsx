import {Box, BoxProps, FormControl, styled} from '@mui/material'
import {FormFieldsData} from './FormFieldsData'
import {FC} from 'react'
import {FieldErrors, UseFormRegister} from 'react-hook-form'
import {CustomTextField} from '@/Shared'
import {CvFormType} from './CvFormShema'

const BoxCustom = styled(Box)<BoxProps>(() => ({
  width: '100%',
}))

interface CvFormProps {
  submitMutate: (e?: React.BaseSyntheticEvent) => Promise<void>
  register: UseFormRegister<CvFormType>
  errors: FieldErrors<CvFormType>
  buttons: React.ReactNode
}

const CvForm: FC<CvFormProps> = ({submitMutate, register, errors, buttons}) => {
  return (
    <BoxCustom component="form" onSubmit={submitMutate}>
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
        <Box sx={{display: 'flex', justifyContent: 'flex-end'}}>{buttons}</Box>
      </FormControl>
    </BoxCustom>
  )
}

export default CvForm
