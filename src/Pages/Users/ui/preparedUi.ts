import {IconButton, styled, TableCell} from '@mui/material'

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
