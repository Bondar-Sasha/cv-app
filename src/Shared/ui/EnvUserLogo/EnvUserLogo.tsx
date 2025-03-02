import {Box, useTheme} from '@mui/material'
import {FC} from 'react'

interface EnvUserLogoProps {
  latter: string
}

const EnvUserLogo: FC<EnvUserLogoProps> = ({latter}) => {
  const theme = useTheme()
  return (
    <Box
      width="40px"
      height="40px"
      borderRadius="20px"
      bgcolor="rgb(189, 189, 189)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSizing="border-box"
      paddingTop="3px"
      color={theme.palette.background.default}
    >
      {latter.toUpperCase()}
    </Box>
  )
}

export default EnvUserLogo
