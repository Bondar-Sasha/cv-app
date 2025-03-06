import {useSignup} from '../api/useSignup'
import {toast} from 'react-toastify'
import AuthForm from '../ui/AuthForm'
import {AuthLayout} from '@/Features'
import {AppRouterMap} from '@/Shared'

const SignupPage = () => {
  const [mutateSignup, {loading}] = useSignup()

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
      title="Register now"
      paragraph="Welcome! Sign up to continue"
      btnTitle="I have an account"
      to={AppRouterMap.login.path}
      form={
        <AuthForm handleAuth={handleSignUp} loading={loading} action="signup" />
      }
    />
  )
}

export default SignupPage
