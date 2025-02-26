import {useSignup} from '../api/useSignup'
import {useEffect} from 'react'
import AuthForm from './AuthForm'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

const RegisterPage = () => {
  const [mutateSignup, {data, loading}] = useSignup()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      localStorage.setItem('access_token', data.signup.access_token)
      localStorage.setItem('refresh_token', data.signup.refresh_token)
      void navigate('/')
    }
  }, [data, navigate])

  const handleSignUp = (email: string, password: string) => {
    mutateSignup({
      variables: {
        auth: {email: email, password: password},
      },
      onError(error) {
        toast(error.message)
      },
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <>
      <h2>Register now</h2>
      <p>Welcome! Sign up to continue</p>
      <AuthForm handleAuth={handleSignUp} action="signup" />

      {loading && <p>Loading...</p>}

      <Link to={'/auth/login'}>I have an Account</Link>
    </>
  )
}

export default RegisterPage
