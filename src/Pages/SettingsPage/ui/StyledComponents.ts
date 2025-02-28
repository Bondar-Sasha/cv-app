import { Select, SelectProps, styled } from "@mui/material";

export const CustomSelect = styled(Select)<SelectProps>(({theme}) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '0',
    '&.Mui-focused': {
      borderColor: theme.palette.error.main,
    },
  },
}))

