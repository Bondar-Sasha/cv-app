import {
  Box,
  Button,
  IconButton,
  styled,
  Table,
  TableCell,
  TableHead,
} from '@mui/material'

export const CustomThCell = styled(TableCell)({
  cursor: 'pointer',
  paddingRight: 0,
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

export const CustomTableButton = styled(Button)({
  color: 'inherit',
  textTransform: 'capitalize',
  fontSize: '17px',
  fontWeight: '400',
  width: '100%',
  padding: '8px 15px',
  justifyContent: 'flex-start',
})

export const ButtonWrapper = styled(Box)(({theme}) => ({
  width: 'max-content',
  display: 'flex',
  padding: '10px 0',
  alignItems: 'flex-start',
  flexDirection: 'column',
  color: theme.palette.text.primary,
  bgcolor: theme.palette.background.default,
}))

export const CustomTableHead = styled(TableHead)(({theme}) => ({
  position: 'sticky',
  top: '0',
  left: '0',
  height: '58px',
  backgroundColor: theme.palette.background.default,
  zIndex: 100,
}))

export const CustomTable = styled(Table)(({theme}) => ({
  '& td, th': {
    backgroundColor: theme.palette.background.default,
    color: 'inherit',
  },
  color: 'inherit',
}))
