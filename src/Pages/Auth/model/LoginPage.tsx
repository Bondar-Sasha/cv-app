import {useEffect} from 'react'
import {useLogin} from '../api/useLogin'
import AuthForm from '../ui/AuthForm'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {AuthLayout} from '@/Features'
import {AppRouterMap} from '@/Shared'
import {useTranslation} from 'react-i18next'

const LoginPage = () => {
  const [mutateLogin, {data, loading}] = useLogin()
  const navigate = useNavigate()
  const {t} = useTranslation()

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
      void navigate(AppRouterMap.users.path)
    }
  }, [data, navigate])

  return (
    <AuthLayout
      title={t('С возвращением')}
      paragraph={t('Рады вас видеть! Войдите, чтобы продолжить')}
      btnTitle={t('Забыли пароль')}
      to={AppRouterMap.forgotPassword.path}
      form={
        <AuthForm loading={loading} handleAuth={handleLogIn} action="login" />
      }
    />
  )
}

export default LoginPage
