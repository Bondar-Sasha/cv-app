import {
  Box,
  BoxProps,
  styled,
  TableContainer,
  TableContainerProps,
  Typography,
  TypographyProps,
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
  overflow: 'scroll',
})

export const CustomTableContainer = styled(TableContainer)<TableContainerProps>(
  ({theme}) => ({
    backgroundColor: theme.palette.background.default,
    boxShadow: 'none',
    maxHeight: '100vh',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      minWidth: '600px',
    },
  })
)
