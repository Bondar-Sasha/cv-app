import {getColorProficiency} from '@/Shared'
import {Box, styled} from '@mui/material'

export const ProficiencySpan = styled('span')<{
  proficiency: number
  willDelete: boolean
}>(({proficiency, willDelete, theme}) => {
  const color = getColorProficiency(proficiency)
  return {
    color: willDelete ? theme.palette.text.primary : color,
  }
})

export const LanguageSpan = styled('span')<{
  willDelete: boolean
}>(({willDelete, theme}) => {
  return {
    color: willDelete
      ? theme.palette.text.primary
      : theme.palette.text.secondary,
  }
})

export const WrapperLanguages = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const ExtraWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
})
