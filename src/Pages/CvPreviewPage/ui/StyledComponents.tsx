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
  justifyContent: 'flex-start',
  width: '100%',
})

export const LeftBox = styled(Box)(({theme}) => ({
  paddingRight: '24px',
  maxWidth: '260px',
  width: '100%',
  minHeight: '100%',
  borderRight: `1px solid ${theme.palette.error.main}`,
}))

export const RightBox = styled(Box)({
  paddingLeft: '24px',
  paddingBottom: '16px',
})

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
        ...sx,
      }}
      {...props}
    >
      {children}
    </TableCell>
  )
}
