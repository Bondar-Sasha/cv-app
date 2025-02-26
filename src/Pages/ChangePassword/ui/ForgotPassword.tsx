import {Button, TextField} from '@mui/material'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useForgotPassword} from '../api/useForgotPassword'
import {toast} from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const [mutateForgot, {loading}] = useForgotPassword()

  const handleForgot = () => {
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
    <div>
      <h2>Forgot password</h2>
      <p>We will sent you an email with further instructions</p>

      <form>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter new password"
          autoComplete="on"
        />

        <Button onClick={handleForgot} disabled={email.length === 0}>
          Reset Password
        </Button>

        {loading && <p>Loading...</p>}
      </form>
      <Link to={'/auth/login'}>Cancel</Link>
    </div>
  )
}

export default ForgotPassword
