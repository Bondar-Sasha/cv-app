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

  const handleForgot = (password: string) => {
    mutateForgot({
      variables: {
        auth: {newPassword: password},
      },
      onCompleted() {
        void navigate(AppRouterMap.login.path)
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
    watch,
  } = useForm<createPasswordForm>({
    resolver: zodResolver(createPasswordShema),
  })

  const password = watch('newPassword', '')

  return (
    <CustomForm
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => {
        handleForgot(data.newPassword)
      })}
    >
      <FormControlled>
        <CustomTextField
          type="password"
          id="newPassword"
          label="Новый пароль"
          name="newPassword"
          autoComplete="password"
          placeholder="Enter new password"
          register={register}
          errors={errors}
        />
        <Wrapper margin={'50px auto 0'}>
          <StyledButton
            variant="contained"
            disabled={loading || password.length === 0}
            type="submit"
          >
            {loading ? <CircleProgress /> : t('Отправить')}
          </StyledButton>
        </Wrapper>
      </FormControlled>
    </CustomForm>
  )
}

export default ResetPasswordForm
