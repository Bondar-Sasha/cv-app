import AuthLayout from '@/Pages/Auth/ui/AuthLayout'
import ChangePasswordForm from '../model/ForgotPasswordForm'
import {Container, Content} from './ContentComponent'

const ChangePassword = () => {
  return (
    <Container>
      <Content>
        <AuthLayout
          title="Forgot password"
          paragraph="We will sent you an email with further instructions"
          btnTitle="Cancel"
          to="/auth/login"
          form={<ChangePasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ChangePassword
