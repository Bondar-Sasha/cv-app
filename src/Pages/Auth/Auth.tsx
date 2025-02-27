import {FC} from 'react'
import {Box, styled} from '@mui/material'
import {StyledLinkList} from '@/Widgets'
import LoginPage from './model/LoginPage'
import SignupPage from './model/SignupPage'

interface AuthProps {
  location: 'login' | 'signup'
}

const Container = styled(Box)(({theme}) => ({
  height: '100vh',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
  overflow: 'hidden',
}))

const Header = styled(Box)({
  width: '100%',
  paddingTop: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Content = styled(Box)({
  width: '700px',
  height: 'calc(100% - 56px)',
  margin: '0px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const Auth: FC<AuthProps> = ({location}) => {
  const links = [
    {
      to: '/auth/login',
      label: 'Log In',
      active: location === 'login',
    },
    {
      to: '/auth/signup',
      label: 'Sign Up',
      active: location === 'signup',
    },
  ]

  return (
    <Container>
      <Header>
        <StyledLinkList arrLinks={links} />
      </Header>

      <Content>
        {location === 'login' && <LoginPage />}
        {location === 'signup' && <SignupPage />}
      </Content>
    </Container>
  )
}

export default Auth
