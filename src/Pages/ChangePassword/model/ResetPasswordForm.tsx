import {CircleProgress, CustomTextField, StyledButton} from '@/Shared/ui'
import {FormControl} from '@mui/material'
import {Wrapper} from '../ui/ContentComponent'
import {useNavigate} from 'react-router-dom'
import {useResetPassword} from '../api/useResetPassword'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createPasswordForm, createPasswordShema} from '../api/passwordShema'

const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const [mutateForgot, {loading}] = useResetPassword()

  const handleForgot = (password: string) => {
    mutateForgot({
      variables: {
        auth: {newPassword: password},
      },
      onCompleted() {
        void navigate('/auth/login')
        toast('Password has been reset')
      },
      onError(error) {
        toast(error.message)
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<createPasswordForm>({
    resolver: zodResolver(createPasswordShema),
  })

  return (
    <FormControl
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
    >
      <CustomTextField
        type="password"
        id="newPassword"
        label="New password"
        name="newPassword"
        autoComplete="password"
        placeholder="Enter new password"
        register={register}
        errors={errors}
      />
      <Wrapper margin={'50px auto 0'}>
        <StyledButton
          variant="contained"
          disabled={loading}
          onClick={handleSubmit((data) => {
            handleForgot(data.newPassword)
          })}
        >
          {loading ? <CircleProgress /> : 'Submit'}
        </StyledButton>
      </Wrapper>
    </FormControl>
  )
}

export default ResetPasswordForm
