import LoginPage from './ui/LoginPage'
import RegisterPage from './ui/RegisterPage'
import {FC} from 'react'
import {Box, styled} from '@mui/material'

import {StyledLinkList} from '@/Widgets'

interface AuthProps {
  location: 'login' | 'signup'
}

const Container = styled(Box)(({theme}) => ({
  maxWidth: '1440px',
  height: '100vh',
  margin: '0 auto',
  padding: '0 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: theme.palette.background.default,
}))

const Header = styled(Box)({
  width: '100%',
  paddingTop: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const Content = styled(Box)({
  width: '100%',
  padding: '20px 0',
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
        {location === 'signup' && <RegisterPage />}
      </Content>
    </Container>
  )
}

export default Auth
