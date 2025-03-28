import {Box, BoxProps, styled} from '@mui/material'

export const CustomMain = styled(Box)<BoxProps>({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const CommonWrapper = styled(Box)<BoxProps>({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '60px',
  rowGap: '0',
  width: '100%',
  maxWidth: 'fit-content',
  marginBottom: '50px',
})

export const FileBox = styled(Box)<BoxProps>({
  position: 'relative',
  alignContent: 'center',
  width: '120px',
  height: '120px',
})

export const InputsWrapper = styled(Box)<BoxProps>({
  width: '100%',
  margin: '16px 0',
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(auto, 1fr))',
  '& > .MuiFormControl-root': {margin: 0},
  '@media (min-width: 1100px)': {
    gridTemplateColumns: 'repeat(2, minmax(auto, auto))',
  },
  gap: '30px',
})
