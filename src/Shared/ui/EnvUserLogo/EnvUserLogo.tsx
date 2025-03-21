import {Box, useTheme} from '@mui/material'
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
    <Box
      width={width || 40}
      height={height || 40}
      minWidth={width || 40}
      minHeight={height || 40}
      borderRadius={width ? width / 2 : 20}
      bgcolor={bgColor || 'rgb(189, 189, 189)'}
      fontSize={width ? width / 3 : 20}
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSizing="border-box"
      color={theme.palette.background.default}
      sx={{
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {!src && latter.toUpperCase()}
    </Box>
  )
}

export default EnvUserLogo
