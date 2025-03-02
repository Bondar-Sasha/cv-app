import {FC, useState} from 'react'
import {
  Box,
  InputAdornment,
  Paper,
  styled,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const CustomTextField = styled(TextField)(({theme}) => ({
  width: '320px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      border: '1px solid rgba(153, 153, 153, 0.5)',
      borderRadius: '20px',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(153, 153, 153, 0.5)',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(153, 153, 153, 0.5)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    height: '43px',
    padding: '0 14px',
  },
}))

const CustomTableHead = styled(TableHead)(({theme}) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  width: '100%',
  position: 'sticky',
  top: 0,
  left: 0,
}))

interface Filters {
  searchState: string
  firstName: boolean
  lastName: boolean
  email: boolean
  department: boolean
  position: boolean
}

const UsersPage: FC = () => {
  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    firstName: true,
    lastName: false,
    email: false,
    department: false,
    position: false,
  })

  return (
    <>
      <Box component="div" position="sticky" top="0" left="0">
        <CustomTextField
          variant="outlined"
          value={filtersState.searchState}
          onChange={(e) => {
            setFilters({...filtersState, searchState: e.target.value})
          }}
          placeholder="Search..."
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="inherit" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <CustomTableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell>Calories</TableCell>
              <TableCell>Fat&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell>
            </TableRow>
          </CustomTableHead>
          {/* <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody> */}
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersPage
