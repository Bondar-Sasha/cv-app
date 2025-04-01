import {Avatar, useTheme} from '@mui/material'
import {FC} from 'react'

interface EnvUserLogoProps {
  latter: string
  width?: number
  height?: number
  bgColor?: string
  src?: string | null
}

const EnvUserLogo: FC<EnvUserLogoProps> = ({
  latter,
  width,
  height,
  bgColor,
  src,
}) => {
  const theme = useTheme()
  return (
    <Avatar
      sx={{
        width: width || 40,
        height: height || 40,
        bgcolor: bgColor || 'rgb(189, 189, 189)',
        color: theme.palette.background.default,
      }}
      src={src || ''}
    >
      {!src && latter.toUpperCase()}
    </Avatar>
  )
}

export default EnvUserLogo
