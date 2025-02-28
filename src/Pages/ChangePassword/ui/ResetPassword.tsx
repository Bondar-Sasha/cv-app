import {AuthLayout} from '@/Features'
import ResetPasswordForm from '../model/ResetPasswordForm'
import {Container, Content} from './ContentComponent'
import {AppRouterMap} from '@/Shared'

const ResetPassword = () => {
  return (
    <Container>
      <Content>
        <AuthLayout
          title="Установите новый пароль"
          paragraph="Почти готово! Теперь создайте новый пароль"
          btnTitle="Вернуться"
          to={AppRouterMap.login.path}
          form={<ResetPasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ResetPassword
