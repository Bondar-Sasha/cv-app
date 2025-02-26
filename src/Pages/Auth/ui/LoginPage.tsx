import {useEffect} from 'react'
import {useLogin} from '../api/useLogin'
import AuthForm from './AuthForm'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'

// {email: 'nat3@nat.mail.ru', password: 'asd!@123'},

const LoginPage = () => {
  const [mutateLogin, {loading, data}] = useLogin()
  const navigate = useNavigate()

  const handleLogIn = (email: string, password: string) => {
    mutateLogin({
      variables: {
        auth: {email: email, password: password},
      },
      onError(error) {
        toast(error.message)
      },
    }).catch((error) => {
      console.error('Login failed', error)
    })
  }

  useEffect(() => {
    if (data?.login) {
      localStorage.setItem('access_token', data.login.access_token)
      localStorage.setItem('refresh_token', data.login.refresh_token)
      void navigate('/')
    }
  }, [data, navigate])

  return (
    <>
      <h2>Welcome back</h2>
      <p>Hello again! Log in to continue</p>
      <AuthForm handleAuth={handleLogIn} action="login" />

      <Link to={'/forgot-password'}>Forgot Password</Link>
      {loading && <p>Loading...</p>}
    </>
  )
}

export default LoginPage
