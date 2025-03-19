import {StyledButton} from '@/Shared'
import {
  styled,
  Box,
  Typography,
  TypographyProps,
  TableCellProps,
  SxProps,
  TableCell,
} from '@mui/material'
import {FC} from 'react'

export const WrapperPreview = styled(Box)({
  padding: ' 32px 24px',
  maxWidth: '80%',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
})

export const SectionBox = styled(Box)({
  marginBottom: '32px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
})

export const LeftBox = styled(Box)({
  paddingRight: '24px',
  flexBasis: '30%',
})

export const RightBox = styled(Box)(({theme}) => ({
  paddingLeft: '24px',
  paddingBottom: '16px',
  flexBasis: '70%',
  borderLeft: `1px solid ${theme.palette.error.main}`,
}))

interface CustomTypographyProps extends TypographyProps {
  text: string
}

export const SubsectionTitle: FC<CustomTypographyProps> = ({
  text,
  sx,
  ...props
}) => {
  return (
    <Typography
      variant="body1"
      sx={{
        margin: '16px 0 8px',
        fontWeight: 'bold',
        ...sx,
      }}
      {...props}
    >
      {text}
    </Typography>
  )
}

export const StyledButtonRed = styled(StyledButton)(({theme}) => ({
  maxWidth: '160px',
  width: '100%',
  height: '40px',
  color: theme.palette.error.main,
  borderColor: theme.palette.error.main,
  '&:hover': {
    backgroundColor: 'rgba(198, 48, 49, 0.04)',
  },
}))

interface StyledTableCellProps extends TableCellProps {
  sx?: SxProps
}

export const StyledTableCell: FC<StyledTableCellProps> = ({
  sx,
  children,
  ...props
}) => {
  return (
    <TableCell
      sx={{
        padding: '8px 16px',
        borderBottom: (theme) => `2px solid ${theme.palette.error.main}`,
        textTransform: 'uppercase',
        fontWeight: '500',
        verticalAlign: 'top',
        textAlign: 'center',
        width: '140px',
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}

export const TableCellInfo: FC<StyledTableCellProps> = ({
  sx,
  children,
  ...props
}) => {
  return (
    <TableCell
      sx={{
        borderBottom: 'none',
        textAlign: 'center',
        padding: '8px 16px',
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}

export const TableCellLast: FC<StyledTableCellProps> = ({
  sx,
  children,
  ...props
}) => {
  return (
    <TableCell
      sx={{
        fontWeight: '500',
        borderBottom: '1px solid rgb(189, 189, 189)',
        padding: '8px 16px 24px',
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}

export const TableCellTechno: FC<StyledTableCellProps> = ({
  sx,
  children,
  ...props
}) => {
  return (
    <TableCell
      sx={{
        borderBottom: 'none',
        fontWeight: '500',
        padding: '8px 16px',
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}
