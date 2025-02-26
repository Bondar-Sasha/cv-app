import {Button, TextField} from '@mui/material'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {createPasswordForm, createPasswordShema} from '../api/passwordShema'
import {useResetPassword} from '../api/useResetPassword'

const ResetPassword = () => {
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
    <div>
      <h2>Set a new password</h2>
      <p>Almost done! Now create a new password</p>

      <form>
        <TextField
          label="New password"
          type="password"
          {...register('newPassword')}
          helperText={errors['newPassword']?.message}
          error={!!errors['newPassword']}
          required
          placeholder="Enter new password"
          autoComplete="on"
        />

        <Button
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={handleSubmit((data) => {
            handleForgot(data.newPassword)
          })}
        >
          Submit
        </Button>

        {loading && <p>Loading...</p>}
      </form>
      <Link to={'/auth/login'}>Back to log in</Link>
    </div>
  )
}

export default ResetPassword
