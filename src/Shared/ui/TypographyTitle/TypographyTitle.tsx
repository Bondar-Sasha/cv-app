import {Typography, useTheme} from '@mui/material'
import {FC} from 'react'

interface TypographyTitleProps {
  title: string
}

const TypographyTitle: FC<TypographyTitleProps> = ({title}) => {
  const theme = useTheme()
  return (
    <Typography
      variant="h4"
      marginBottom="24px"
      fontSize={'2.75rem'}
      color={theme.palette.text.primary}
      textAlign="center"
    >
      {title}
    </Typography>
  )
}

export default TypographyTitle
