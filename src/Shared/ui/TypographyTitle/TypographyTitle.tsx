import {Typography, useTheme} from '@mui/material'
import {FC} from 'react'
import {useTranslation} from 'react-i18next'

interface TypographyTitleProps {
  title: string
}

const TypographyTitle: FC<TypographyTitleProps> = ({title}) => {
  const theme = useTheme()
  const {t} = useTranslation()
  return (
    <Typography
      variant="h4"
      marginBottom="24px"
      fontSize={'2.75rem'}
      color={theme.palette.text.primary}
      textAlign="center"
    >
      {t(title)}
    </Typography>
  )
}

export default TypographyTitle
