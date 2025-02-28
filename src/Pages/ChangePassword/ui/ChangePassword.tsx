import {AuthLayout} from '@/Features'
import ChangePasswordForm from '../model/ForgotPasswordForm'
import {Container, Content} from './ContentComponent'
import {AppRouterMap} from '@/Shared'
import {useTranslation} from 'react-i18next'

const ChangePassword = () => {
  const {t} = useTranslation()
  return (
    <Container>
      <Content>
        <AuthLayout
          title={t('Забыли пароль')}
          paragraph={t('Мы отправим вам письмо с дальнейшими инструкциями')}
          btnTitle={t('Отмена')}
          to={AppRouterMap.login.path}
          form={<ChangePasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ChangePassword
