import {FC} from 'react'
import {Link} from 'react-router-dom'
import {Typography, useTheme} from '@mui/material'
import {StyledButton, TypographyTitle} from '@/Shared/ui'
import {StyledContainer, Wrapper} from './StyledComponents'

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

  return (
    <StyledContainer>
      <TypographyTitle title={title} />

      <Typography
        color={theme.palette.text.primary}
        fontSize={'1.2rem'}
        marginBottom={'10px'}
      >
        {paragraph}
      </Typography>

      {form}

      <Wrapper>
        <StyledButton variant="text" component={Link} to={to}>
          {btnTitle}
        </StyledButton>
      </Wrapper>
    </StyledContainer>
  )
}

export default AuthLayout
