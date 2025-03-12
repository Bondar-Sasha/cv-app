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
  disabled: boolean
}>(({willDelete, theme, disabled}) => {
  let color
  if (willDelete) {
    color = theme.palette.text.primary
  } else if (disabled) {
    color = 'rgba(0, 0, 0, 0.26)'
  } else {
    color = theme.palette.text.secondary
  }

  return {
    color: color,
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
