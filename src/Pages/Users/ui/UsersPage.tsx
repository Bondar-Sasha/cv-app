import {FC, useState} from 'react'
import {Box, InputAdornment, styled, TextField} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

const CustomTextField = styled(TextField)(({theme}) => ({
  width: '320px',
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    backgroundColor: theme.palette.background.default,
    '& fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: '20px',
    },
    '&:hover fieldset': {
      border: '1px solid rgba(255, 255, 255, 0.8)',
    },
    '&.Mui-focused fieldset': {
      border: '1px solid rgba(255, 255, 255, 1)',
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    height: '43px',
    padding: '0 14px',
  },
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
        <Box component="div" position="sticky" top="0" left="0"></Box>
      </Box>
    </>
  )
}

export default UsersPage
