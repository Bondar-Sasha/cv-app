import {createAuthShema} from '@/Pages/Auth/api/authShema'
import {InnerWrapper} from '@/Pages/ui'
import {CustomTextField, StyledButton} from '@/Shared'
import {zodResolver} from '@hookform/resolvers/zod'
import {Box, BoxProps, FormControl, styled} from '@mui/material'
import {useForm} from 'react-hook-form'

export const BoxCustom = styled(Box)<BoxProps>(() => ({
  width: '100%',
}))

const CvDetailsLayout = () => {
  const {
    register,
    // HandleSubmit,
    formState: {errors},
  } = useForm({
    resolver: zodResolver(createAuthShema),
  })

  return (
    <InnerWrapper>
      <BoxCustom component={'form'}>
        <FormControl
          sx={{
            width: '100%',
          }}
        >
          <CustomTextField
            type="text"
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            register={register}
            errors={errors}
          />
          <CustomTextField
            type="text"
            id="education"
            label="Education"
            name="education"
            autoComplete="education"
            register={register}
            errors={errors}
          />
          <CustomTextField
            type="text"
            id="description"
            label="Description"
            name="description"
            autoComplete="description"
            multiline
            rows={7}
            register={register}
            errors={errors}
          />
          <StyledButton
            variant="contained"
            children={'Update'}
            disabled
            sx={{marginTop: '25px', width: '50%', alignSelf: 'flex-end'}}
          />
        </FormControl>
      </BoxCustom>
    </InnerWrapper>
  )
}

export default CvDetailsLayout
