import {FC} from 'react'
import {StyledLinkList} from '@/Widgets'
import LoginPage from '../model/LoginPage'
import SignupPage from '../model/SignupPage'
import {Container, Content, Header} from './StyledComponents'
import {AppRouterMap} from '@/Shared'
import {useTranslation} from 'react-i18next'

interface AuthProps {
  location: 'login' | 'signup'
}

const Auth: FC<AuthProps> = ({location}) => {
  const {t} = useTranslation()
  const links = [
    {
      to: AppRouterMap.login.path,
      label: t('Войти'),
      active: location === 'login',
    },
    {
      to: AppRouterMap.singUp.path,
      label: t('Создать'),
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
