import {AuthLayout} from '@/Features'
import ChangePasswordForm from '../model/ForgotPasswordForm'
import {Container, Content} from './ContentComponent'
import {AppRouterMap} from '@/Shared'

const ChangePassword = () => {
  return (
    <Container>
      <Content>
        <AuthLayout
          title="Забыли пароль"
          paragraph="Мы отправим вам письмо с дальнейшими инструкциями"
          btnTitle="Отмена"
          to={AppRouterMap.login.path}
          form={<ChangePasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ChangePassword
