import {AuthLayout} from '@/Features'
import ChangePasswordForm from '../model/ForgotPasswordForm'
import {Container, Content} from './ContentComponent'
import {AppRouterMap} from '@/Shared'

const ChangePassword = () => {
  return (
    <Container>
      <Content>
        <AuthLayout
          title="Forgot password"
          paragraph="We will sent you an email with further instructions"
          btnTitle="Cancel"
          to={AppRouterMap.login.path}
          form={<ChangePasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ChangePassword
