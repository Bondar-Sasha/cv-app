import {Button, styled, ButtonProps, Box, BoxProps} from '@mui/material'
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

export const CustomButton = styled(Button)<ButtonProps>(({theme}) => ({
  color: 'rgb(198, 48, 49)',
  width: '220px',
  height: '40px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgb(236, 209, 210)'
        : 'rgba(198, 48, 49, 0.08)',
  },
}))

export const CustomBox = styled(Box)<BoxProps>(({theme}) => ({
  bgcolor: theme.palette.background.default,
  borderRadius: '10px',
  height: '20px',
  border: '1px solid rgb(189, 189, 189)',
  width: 'fit-content',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  padding: ' 0 7px',
  maxWidth: '300px',
}))

export const SelectWrapper = styled(Box)<BoxProps>({
  margin: '16px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 1fr))',
  gap: '30px',
  '@media (min-width: 900px)': {
    gridTemplateColumns: 'repeat(2, minmax(auto, 600px))',
  },
})
