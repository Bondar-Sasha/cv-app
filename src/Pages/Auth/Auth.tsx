import {FC} from 'react'
import {StyledLinkList} from '@/Widgets'
import LoginPage from './model/LoginPage'
import SignupPage from './model/SignupPage'
import {Container, Content, Header} from './ui/StyledComponents'

interface AuthProps {
  location: 'login' | 'signup'
}

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
