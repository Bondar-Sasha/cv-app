import {useLogin} from '../api/useLogin'
import AuthForm from '../ui/AuthForm'
import {toast} from 'react-toastify'
import {AuthLayout} from '@/Features'
import {AppRouterMap} from '@/Shared'

const LoginPage = () => {
  const [mutateLogin, {loading}] = useLogin()

  const handleLogIn = (email: string, password: string) => {
    mutateLogin({
      variables: {
        auth: {email: email, password: password},
      },
      onError(error) {
        toast.error((error as Error).message)
      },
    }).catch((error) => {
      console.error('Login failed', error)
    })
  }

  return (
    <AuthLayout
      title="Welcome back"
      paragraph="Hello again! Log in to continue"
      btnTitle="Forgot password"
      to={AppRouterMap.forgotPassword.path}
      form={
        <AuthForm loading={loading} handleAuth={handleLogIn} action="login" />
      }
    />
  )
}

export default LoginPage
