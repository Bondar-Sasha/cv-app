import {getColorProficiency} from '@/Shared'
import {Box, styled} from '@mui/material'

interface ProficiencySpanProps {
  proficiency: number
  willDelete: boolean
}

export const ProficiencySpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'proficiency' && prop !== 'willDelete',
})<ProficiencySpanProps>(({proficiency, willDelete, theme}) => {
  const color = getColorProficiency(proficiency)
  return {
    color: willDelete ? theme.palette.text.primary : color,
  }
})

interface LanguageSpanProps {
  willDelete: boolean
  disabled: boolean
}

export const LanguageSpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'willDelete' && prop !== 'disabled',
})<LanguageSpanProps>(({willDelete, theme, disabled}) => {
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
