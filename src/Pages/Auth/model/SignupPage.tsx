import {useSignup} from '../api/useSignup'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import AuthForm from '../ui/AuthForm'
import {AuthLayout} from '@/Features'
import {AppRouterMap} from '@/Shared'

const SignupPage = () => {
  const [mutateSignup, {data, loading}] = useSignup()
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      localStorage.setItem('access_token', data.signup.access_token)
      localStorage.setItem('refresh_token', data.signup.refresh_token)
      void navigate(AppRouterMap.users.path)
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
    <AuthLayout
      title="Зарегистрируйтесь"
      paragraph="Добро пожаловать! Создайте аккаунт, чтобы продолжить"
      btnTitle="У меня есть аккаунт"
      to={AppRouterMap.login.path}
      form={
        <AuthForm handleAuth={handleSignUp} loading={loading} action="signup" />
      }
    />
  )
}

export default SignupPage
