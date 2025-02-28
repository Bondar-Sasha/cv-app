import {
  AppRouterMap,
  CircleProgress,
  CustomTextField,
  StyledButton,
} from '@/Shared'
import {zodResolver} from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {useForgotPassword} from '../api/useForgotPassword'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {CustomForm, FormControlled, Wrapper} from '../ui/ContentComponent'
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
        void navigate(AppRouterMap.login.path)
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
    <CustomForm // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => {
        handleForgot(data.email)
      })}
    >
      <FormControlled>
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
            type="submit"
          >
            {loading ? <CircleProgress /> : 'Reset password'}
          </StyledButton>
        </Wrapper>
      </FormControlled>
    </CustomForm>
  )
}

export default ForgotPasswordForm
