import {useEffect} from 'react'
import {useLogin} from '../api/useLogin'
import AuthForm from '../ui/AuthForm'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {AuthLayout} from '@/Features'

const LoginPage = () => {
  const [mutateLogin, {data, loading}] = useLogin()
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
    <AuthLayout
      title="Welcome back"
      paragraph="Hello again! Log in to continue"
      btnTitle="FORGOT PASSWORD"
      to="/forgot-password"
      form={
        <AuthForm loading={loading} handleAuth={handleLogIn} action="login" />
      }
    />
  )
}

export default LoginPage
