import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createAuthForm, createAuthShema} from '../api/authShema'
import {CircleProgress, CustomTextField, StyledButton} from '@/Shared'
import {BoxCustom, CustomFormControl, Wrapper} from './StyledComponents'
import {useTranslation} from 'react-i18next'

export interface AuthFormProps {
  action: 'login' | 'signup'
  handleAuth: (email: string, password: string) => void
  loading: boolean
}

const AuthForm: FC<AuthFormProps> = ({handleAuth, action, loading}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<createAuthForm>({
    resolver: zodResolver(createAuthShema),
  })
  const {t} = useTranslation()

  return (
    <BoxCustom
      component={'form'}
      onSubmit={handleSubmit((data) => {
        handleAuth(data.email, data.password)
      })}
    >
      <CustomFormControl>
        <CustomTextField
          {...register('email')}
          type="email"
          id="email"
          label="Email"
          autoComplete="email"
          placeholder="example@mail.com"
          errors={errors}
        />
        <CustomTextField
          {...register('password')}
          id="password"
          type="password"
          label="Password"
          autoComplete="password"
          placeholder="Enter your password"
          errors={errors}
        />

        <Wrapper margin={'50px auto 0'}>
          <StyledButton variant="contained" disabled={loading} type="submit">
            {loading ? (
              <CircleProgress />
            ) : action === 'login' ? (
              t('Log in')
            ) : (
              t('Create account')
            )}
          </StyledButton>
        </Wrapper>
      </CustomFormControl>
    </BoxCustom>
  )
}

export default AuthForm
