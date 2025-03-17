import {InputAdornment, styled, TextField} from '@mui/material'
import {ComponentProps, FC} from 'react'
import SearchIcon from '@mui/icons-material/Search'

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
    '&:hover fieldset': {
      border: `1px solid ${theme.palette.error.main}`,
    },
    '&.Mui-focused fieldset': {
      border: `1px solid ${theme.palette.error.main}`,
    },
  },
  '& .MuiOutlinedInput-input': {
    color: theme.palette.text.primary,
    height: '43px',
    padding: '0 14px',
  },
}))

const SearchInput: FC<ComponentProps<typeof TextField>> = (props) => {
  return (
    <CustomTextField
      {...props}
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
  )
}
export default SearchInput
