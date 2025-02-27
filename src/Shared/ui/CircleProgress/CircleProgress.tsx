import {CircularProgress, useTheme} from '@mui/material'

const CircleProgress = () => {
  const theme = useTheme()
  return <CircularProgress size={27} color={theme.palette.common.white} />
}

export default CircleProgress
