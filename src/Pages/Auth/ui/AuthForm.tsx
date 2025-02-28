import {Box, FormControl} from '@mui/material'
import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createAuthForm, createAuthShema} from '../api/authShema'
import {CircleProgress, CustomTextField, StyledButton} from '@/Shared'
import {Wrapper} from './StyledComponents'

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

  return (
    <Box
      component={'form'}
      sx={{
        width: '100%',
        alignItems: 'center',
      }}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit((data) => {
        handleAuth(data.email, data.password)
      })}
    >
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

        <Wrapper margin={'50px auto 0'}>
          <StyledButton variant="contained" disabled={loading} type="submit">
            {loading ? (
              <CircleProgress />
            ) : action === 'login' ? (
              'Log in'
            ) : (
              'Create Account'
            )}
          </StyledButton>
        </Wrapper>
      </FormControl>
    </Box>
  )
}

export default AuthForm
