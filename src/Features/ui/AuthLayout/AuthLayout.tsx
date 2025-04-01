import {FC} from 'react'
import {Link} from 'react-router-dom'
import {Typography, useTheme} from '@mui/material'
import {StyledButton, TypographyTitle} from '@/Shared'
import {StyledContainer, Wrapper} from './StyledComponent'
import {useTranslation} from 'react-i18next'

interface AuthLayoutProps {
  title: string
  paragraph: string
  btnTitle: string
  to: string
  form: JSX.Element
}

const AuthLayout: FC<AuthLayoutProps> = ({
  title,
  paragraph,
  btnTitle,
  to,
  form,
}) => {
  const theme = useTheme()
  const {t} = useTranslation()

  return (
    <StyledContainer>
      <TypographyTitle title={title} />

      <Typography
        color={theme.palette.text.primary}
        fontSize={'1.2rem'}
        marginBottom={'10px'}
        textAlign="center"
      >
        {t(paragraph)}
      </Typography>

      {form}

      <Wrapper>
        <StyledButton variant="text" component={Link} to={to}>
          {t(btnTitle)}
        </StyledButton>
      </Wrapper>
    </StyledContainer>
  )
}

export default AuthLayout
