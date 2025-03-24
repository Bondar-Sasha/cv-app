import {styled} from '@mui/material/styles'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import {FC} from 'react'

const Loader = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.error.light,
  backgroundColor: theme.palette.background.default,
  position: 'static',
  overflow: 'none',
  top: 0,
  left: 0,
  minHeight: '200px',
  width: '100%',
  height: '100%',
}))

interface LoaderBackdropProps {
  loading: boolean
}

const LoaderBackdrop: FC<LoaderBackdropProps> = ({loading}) => {
  return (
    <Loader open={loading}>
      <CircularProgress color="inherit" />
    </Loader>
  )
}

export default LoaderBackdrop
