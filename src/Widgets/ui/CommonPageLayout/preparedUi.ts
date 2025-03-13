import {Box, Button, styled} from '@mui/material'

interface AsideMarkerProps {
  isPicked: boolean
}
export const CustomPopoverButton = styled(Button)(({theme}) => ({
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'left',
}))

export const AsideMarker = styled('div', {
  shouldForwardProp: (prop) => prop !== 'isPicked',
})<AsideMarkerProps>(({theme, isPicked}) => {
  const colorsMap = {
    light: 'rgba(0, 0, 0, 0.04)',
    dark: 'rgba(255, 255, 255, 0.08)',
  }

  return {
    ':hover': {
      background: colorsMap[theme.palette.mode],
    },
    backgroundColor: isPicked ? colorsMap[theme.palette.mode] : '',
  }
})

export const ResponsiveBox = styled(Box)(({theme}) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  display: 'grid',
  gap: '0',
  width: '100%',
  height: '100%',
  '@media (width > 768px)': {
    gridTemplateColumns: 'auto 1fr',
  },
  '@media (width <= 768px)': {
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 56px',
  },
}))
