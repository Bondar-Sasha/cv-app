import {TableHead, TableRow} from '@mui/material'
import {StyledTableCell} from './StyledComponents'

const TableHeadPreview = () => {
  return (
    <TableHead>
      <TableRow>
        <StyledTableCell colSpan={2} sx={{width: 'auto', textAlign: 'left'}}>
          Skills
        </StyledTableCell>
        <StyledTableCell>Experience in years</StyledTableCell>
        <StyledTableCell>Last used</StyledTableCell>
      </TableRow>
    </TableHead>
  )
}

export default TableHeadPreview
