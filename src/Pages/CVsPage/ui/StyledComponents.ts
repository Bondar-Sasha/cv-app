import {
  Box,
  BoxProps,
  styled,
  TableContainer,
  TableContainerProps,
  TableHead,
  Typography,
  TypographyProps,
  TableHeadProps,
} from '@mui/material'

export const TypographyCustom = styled(Typography)<TypographyProps>(
  ({theme}) => ({
    display: 'inline',
    color: theme.palette.text.primary,
    '&:not(:last-child)': {
      marginRight: '10px',
    },
    '&:last-child': {
      fontWeight: '700',
    },
  })
)

export const BoxCustom = styled(Box)<BoxProps>({
  display: 'flex',
  gap: '10px',
  width: '100%',
  justifyContent: 'flex-end',
  marginTop: '30px',
})

export const TableBox = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  padding: '10px 0',
  maxHeight: '85vh',
})

export const CustomTableContainer = styled(TableContainer)<TableContainerProps>(
  ({theme}) => ({
    '&::-webkit-scrollbar': {width: 0},
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '600px',
    },
  })
)

export const CustomTblHead = styled(TableHead)<TableHeadProps>(({theme}) => ({
  position: 'sticky',
  top: '0',
  left: '0',
  backgroundColor: theme.palette.background.default,
  zIndex: theme.zIndex.drawer + 1,
}))
