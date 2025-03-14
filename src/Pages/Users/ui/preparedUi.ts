import {IconButton, styled, TableCell, TextField} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export const CustomTextField = styled(TextField)(({theme}) => ({
  zIndex: 100,
  width: '320px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      border: '1px solid rgba(153, 153, 153, 0.5)',
      borderRadius: '20px',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(78, 78, 78, 0.5)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    height: '43px',
    padding: '0 14px',
  },
}))

export const CustomThCell = styled(TableCell)({
  cursor: 'pointer',
  paddingRight: 0,
  border: 'none',
  whiteSpace: 'nowrap',
})

export const CustomTdCell = styled(TableCell)({
  textOverflow: 'ellipsis',
  border: 'none',
  maxWidth: '300px',
})

export const CustomIconButton = styled(IconButton)({
  zIndex: 0,
  '& .MuiSvgIcon-root': {
    fontSize: '14px',
    zIndex: 0,
  },
})

interface CustomArrowProps {
  arrowState: boolean | null
}

export const CustomArrow = styled(ArrowUpwardIcon, {
  shouldForwardProp: (prop) => prop !== 'arrowState',
})<CustomArrowProps>(({arrowState}) => ({
  color: 'inherit',
  fontSize: '12px',
  marginLeft: '7px',
  cursor: 'pointer',
  visibility: arrowState === null ? 'hidden' : 'visible',
  transform: arrowState ? 'rotate(0deg)' : 'rotate(180deg)',
}))
