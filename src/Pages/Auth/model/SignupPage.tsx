import {useSignup} from '../api/useSignup'
import {toast} from 'react-toastify'
import AuthForm from '../ui/AuthForm'
import {AuthLayout} from '@/Features'
import {AppRouterMap} from '@/Shared'

const SignupPage = () => {
  const [mutateSignup, {loading}] = useSignup()

  const handleSignUp = async (email: string, password: string) => {
    try {
      await mutateSignup({
        variables: {
          auth: {email: email, password: password},
        },
      })
    } catch (error) {
      toast.error((error as Error).message)
      console.error(error)
    }
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
