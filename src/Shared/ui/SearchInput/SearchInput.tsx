import {IconButton, InputAdornment, styled, TextField} from '@mui/material'
import {ComponentProps, FC} from 'react'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'

export const CustomTextField = styled(TextField)(({theme}) => ({
  zIndex: 100,
  maxWidth: '320px',
  width: '100%',
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

interface SearchInputProps extends ComponentProps<typeof TextField> {
  reset: () => void
}

const SearchInput: FC<SearchInputProps> = ({value, reset, ...props}) => {
  return (
    <CustomTextField
      {...props}
      value={value}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="inherit" />
            </InputAdornment>
          ),
          endAdornment: value ? (
            <InputAdornment position="end">
              <IconButton onClick={() => reset()}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ) : null,
        },
      }}
    />
  )
}

export default SearchInput
