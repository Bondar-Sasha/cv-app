import { FormControl, MenuItem, Select, SelectProps, styled } from "@mui/material"

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
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(198, 48, 49, 0.12) !important' : 'rgba(198, 48, 49, 0.24) !important',
  },
  '&:hover': {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.08)',
  },
}))

export const CustomSelect = styled(Select)<SelectProps>(({theme}) => ({
  '& .MuiSelect-select': {
    fontSize: '1.2rem',
    lineHight: '1.8rem',
    paddingTop: '19px',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      width: '100%',
      borderRadius: 0,
      borderColor: theme.palette.error.main,
      '&.Mui-focused': {
        borderColor: theme.palette.error.main,
      },
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.error.main,
    },
    '&.Mui-focused': {
      boxShadow: 'none',
    },
    '& input': {
      '&:-webkit-autofill': {
        fontSize: '1.2rem',
        WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
      },
      '&:-webkit-autofill:focus': {
        WebkitBoxShadow: `0 0 0 100px ${theme.palette.background.default} inset`,
        WebkitTextFillColor: theme.palette.text.primary,
      },
    },
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0',
    '&.Mui-focused': {
      borderColor: theme.palette.error.main,
    },
  },
}))