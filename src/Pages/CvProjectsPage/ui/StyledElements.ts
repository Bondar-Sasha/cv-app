import {styled} from '@mui/material'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'

export const CustomDate = styled(DatePicker)(({theme}) => ({
  '& .MuiInputLabel-root': {
    color: theme.palette.error.main,
    '&.Mui-focused': {
      color: theme.palette.error.main,
    },
  },
  '& .MuiOutlinedInput-root': {
    color: 'inherit',
    '& fieldset': {
      borderRadius: 0,
      borderColor: theme.palette.error.main,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
  },
}))
