import {Typography, useTheme, SxProps} from '@mui/material'
import {FC} from 'react'
import {useTranslation} from 'react-i18next'

interface TypographyTitleProps {
  title: string
  sx?: SxProps
}

const TypographyTitle: FC<TypographyTitleProps> = ({title, sx}) => {
  const theme = useTheme()
  const {t} = useTranslation()

  return (
    <Typography
      variant="h4"
      marginBottom="24px"
      fontSize="2.75rem"
      color={theme.palette.text.primary}
      textAlign="center"
      sx={sx}
    >
      {t(title)}
    </Typography>
  )
}

export default TypographyTitle
