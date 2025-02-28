import {AuthLayout} from '@/Features'
import ResetPasswordForm from '../model/ResetPasswordForm'
import {Container, Content} from './ContentComponent'
import {AppRouterMap} from '@/Shared'
import {useTranslation} from 'react-i18next'

const ResetPassword = () => {
  const {t} = useTranslation()
  return (
    <Container>
      <Content>
        <AuthLayout
          title={t('Установите новый пароль')}
          paragraph={t('Почти готово! Теперь создайте новый пароль')}
          btnTitle={t('Вернуться')}
          to={AppRouterMap.login.path}
          form={<ResetPasswordForm />}
        />
      </Content>
    </Container>
  )
}

export default ResetPassword
