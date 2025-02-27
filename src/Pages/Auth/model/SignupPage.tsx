import {useSignup} from '../api/useSignup'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import AuthForm from '../ui/AuthForm'
import {AuthLayout} from '@/Features'

const SignupPage = () => {
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
    <AuthLayout
      title="Register now"
      paragraph="Welcome! Sign up to continue"
      btnTitle="I have an Account"
      to="/auth/login"
      form={
        <AuthForm handleAuth={handleSignUp} loading={loading} action="signup" />
      }
    />
  )
}

export default SignupPage
