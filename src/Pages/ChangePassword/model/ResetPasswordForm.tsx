import {CircleProgress, CustomTextField, StyledButton} from '@/Shared/ui'
import {CustomForm, FormControlled, Wrapper} from '../ui/ContentComponent'
import {useNavigate} from 'react-router-dom'
import {useResetPassword} from '../api/useResetPassword'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createPasswordForm, createPasswordShema} from '../api/passwordShema'
import {AppRouterMap} from '@/Shared'
import {useTranslation} from 'react-i18next'

const ResetPasswordForm = () => {
  const navigate = useNavigate()
  const [mutateForgot, {loading}] = useResetPassword()
  const {t} = useTranslation()

  const handleForgot = async (password: string) => {
    try {
      await mutateForgot({
        variables: {
          auth: {newPassword: password},
        },
      })
      void navigate(AppRouterMap.login.path)
      toast('Password has been reset')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const {
    register,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm<createPasswordForm>({
    resolver: zodResolver(createPasswordShema),
  })

  const password = watch('newPassword', '')

  return (
    <CustomForm
      onSubmit={handleSubmit((data) => {
        void handleForgot(data.newPassword)
      })}
    >
      <FormControlled>
        <CustomTextField
          {...register('newPassword')}
          type="password"
          id="newPassword"
          label="New password"
          autoComplete="password"
          placeholder="Enter new password"
          errors={errors}
        />
        <Wrapper margin={'50px auto 0'}>
          <StyledButton
            variant="contained"
            disabled={loading || password.length === 0}
            type="submit"
          >
            {loading ? <CircleProgress /> : t('Submit')}
          </StyledButton>
        </Wrapper>
      </FormControlled>
    </CustomForm>
  )
}

export default ResetPasswordForm
