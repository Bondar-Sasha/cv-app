import {FormControl} from '@mui/material'
import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createAuthForm, createAuthShema} from '../api/authShema'
import {CustomTextField, StyledButton} from '@/Shared/ui'
import {Wrapper} from './LoginPage'

interface AuthFormProps {
  action: 'login' | 'signup'
  handleAuth: (email: string, password: string) => void
}

const AuthForm: FC<AuthFormProps> = ({handleAuth, action}) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<createAuthForm>({
    resolver: zodResolver(createAuthShema),
  })

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
      <CustomTextField
        id="password"
        type="password"
        label="Password"
        name="password"
        autoComplete="password"
        placeholder="Enter your password"
        register={register}
        errors={errors}
      />

      <Wrapper margin={'40px auto 0'}>
        <StyledButton
          variant="contained"
          onClick={handleSubmit((data) => {
            handleAuth(data.email, data.password)
          })}
        >
          {action === 'login' ? 'Log in' : 'Create Account'}
        </StyledButton>
      </Wrapper>
    </FormControl>
  )
}

export default AuthForm
