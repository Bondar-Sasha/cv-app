import {Typography, useTheme} from '@mui/material'
import {FC} from 'react'

interface TypographyTitleProps {
  title: string
}

const TypographyTitle: FC<TypographyTitleProps> = ({title}) => {
  const theme = useTheme()
  return (
    <Typography
      variant="h2"
      fontSize={'34px'}
      fontWeight={400}
      color={theme.palette.text.primary}
    >
      {title}
    </Typography>
  )
}

export default TypographyTitle
