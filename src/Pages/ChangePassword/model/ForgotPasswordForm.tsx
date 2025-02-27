import {CircleProgress, CustomTextField, StyledButton} from '@/Shared/ui'
import {zodResolver} from '@hookform/resolvers/zod'
import {FormControl} from '@mui/material'
import {useForm} from 'react-hook-form'
import {useForgotPassword} from '../api/useForgotPassword'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Wrapper} from '../ui/ContentComponent'
import {createForgotForm, createForgotShema} from '../api/forgotShema'

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<createForgotForm>({
    resolver: zodResolver(createForgotShema),
  })

  const email = watch('email', '')
  const navigate = useNavigate()
  const [mutateForgot, {loading}] = useForgotPassword()

  const handleForgot = (email: string) => {
    mutateForgot({
      variables: {
        auth: {email: email},
      },
      onCompleted() {
        void navigate('/auth/login')
        toast('Check your email inbox')
      },
      onError(error) {
        toast(error.message)
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <FormControl
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <CustomTextField
        type="email"
        id="email"
        label="Email"
        name="email"
        autoComplete="email"
        placeholder="example@mail.com"
        register={register}
        errors={errors}
      />
      <Wrapper margin={'50px auto 0'}>
        <StyledButton
          variant="contained"
          disabled={loading || email.length === 0}
          onClick={handleSubmit((data) => {
            handleForgot(data.email)
          })}
        >
          {loading ? <CircleProgress /> : 'Reset password'}
        </StyledButton>
      </Wrapper>
    </FormControl>
  )
}

export default ForgotPasswordForm
