import AuthLayout from '@/Pages/Auth/ui/AuthLayout'
import ResetPasswordForm from '../model/ResetPasswordForm'
import {Container, Content} from './ContentComponent'

const ResetPassword = () => {
  return (
    <Container>
      <Content>
        <AuthLayout
          title="Set a new password"
          paragraph="Almost done! Now create a new password"
          btnTitle="Back to log in"
          to="/auth/login"
          form={<ResetPasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ResetPassword
