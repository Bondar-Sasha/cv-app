import {FormControl, MenuItem, styled} from '@mui/material'

export const CustomFormControl = styled(FormControl)(({theme}) => ({
  '& label.Mui-focused': {
    color: theme.palette.error.main,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.error.main,
  },
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.error.main,
    },
  },
}))

export const CustomMenuItem = styled(MenuItem)(({theme}) => ({
  '&.MuiMenuItem-root': {
    fontSize: '1.2rem',
  },
  '&.Mui-selected': {
    backgroundColor: 'rgba(198, 48, 49, 0.08) !important',
  },
  '&.Mui-selected:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(198, 48, 49, 0.12) !important'
        : 'rgba(198, 48, 49, 0.24) !important',
  },
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, 0.04) !important'
        : 'rgba(255, 255, 255, 0.08) !important',
  },
}))
