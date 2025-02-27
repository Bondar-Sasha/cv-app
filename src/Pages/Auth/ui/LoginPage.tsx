import {useEffect} from 'react'
import {useLogin} from '../api/useLogin'
import AuthForm from './AuthForm'
import {Link, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {Box, Container, styled, Typography, useTheme} from '@mui/material'
import {StyledButton, TypographyTitle} from '@/Shared/ui'

// {email: 'nat3@nat.mail.ru', password: 'asd!@123'},

const StyledContainer = styled(Container)({
  display: 'flex',
  Width: '100%',
  height: 'max-content',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
})

export const Wrapper = styled(Box)(() => ({
  maxWidth: '43%',
  width: '100%',
}))

const LoginPage = () => {
  const [mutateLogin, {loading, data}] = useLogin()
  const navigate = useNavigate()
  const theme = useTheme()

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
    <StyledContainer>
      <TypographyTitle title="Welcome back" />

      <Typography
        title="Welcome back"
        color={theme.palette.text.primary}
        fontSize={'1.2rem'}
      >
        Hello again! Log in to continue
      </Typography>

      <AuthForm handleAuth={handleLogIn} action="login" />

      <Wrapper>
        <StyledButton variant="text" component={Link} to="/forgot-password">
          FORGOT PASSWORD
        </StyledButton>
      </Wrapper>

      {loading && <p>Loading...</p>}
    </StyledContainer>
  )
}

export default LoginPage
