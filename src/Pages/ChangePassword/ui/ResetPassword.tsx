import {AuthLayout} from '@/Features'
import ResetPasswordForm from '../model/ResetPasswordForm'
import {Container, Content} from './ContentComponent'
import {AppRouterMap} from '@/Shared'

const ResetPassword = () => {
  return (
    <Container>
      <Content>
        <AuthLayout
          title="Set a new password"
          paragraph="Almost done! Now create a new password"
          btnTitle="Back to log in"
          to={AppRouterMap.login.path}
          form={<ResetPasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ResetPassword
