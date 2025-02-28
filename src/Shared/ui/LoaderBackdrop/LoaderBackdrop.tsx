import {styled} from '@mui/material/styles'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import {FC} from 'react'

const Loader = styled(Backdrop)(({theme}) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: theme.palette.common.white,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
