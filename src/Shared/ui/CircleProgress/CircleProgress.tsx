import {CircularProgress, useTheme} from '@mui/material'

const CircleProgress = () => {
  const theme = useTheme()
  return (
    <CircularProgress size={27} style={{color: theme.palette.text.primary}} />
  )
}

export default CircleProgress
