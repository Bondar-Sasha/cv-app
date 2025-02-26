import {Button, TextField} from '@mui/material'
import {FC} from 'react'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createAuthForm, createAuthShema} from '../api/authShema'

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
    <form>
      <TextField
        label="Email"
        {...register('email')}
        helperText={errors['email']?.message}
        error={!!errors['email']}
        placeholder="example@mail.com"
        required
        autoComplete="on"
      />
      <TextField
        label="Password"
        type="password"
        {...register('password')}
        helperText={errors['password']?.message}
        error={!!errors['password']}
        placeholder="Enter your password"
        required
        autoComplete="on"
      />
      <Button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={handleSubmit((data) => {
          handleAuth(data.email, data.password)
        })}
      >
        {action === 'login' ? 'Log in' : 'Create Account'}
      </Button>
    </form>
  )
}

export default AuthForm
