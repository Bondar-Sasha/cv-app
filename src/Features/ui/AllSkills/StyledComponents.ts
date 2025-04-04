import {getColorProficiency} from '@/Shared'
import {Box, Button, keyframes, styled} from '@mui/material'

export const ResponsiveBox = styled(Box)(({theme}) => ({
  flexBasis: '33%',
  minWidth: '220px',
  [theme.breakpoints.down('md')]: {
    flexBasis: '50%',
  },
}))

export const ResponsiveButtonBox = styled(Box)(({theme}) => ({
  position: 'relative',
  display: 'flex',
  paddingTop: '20px',
  alignSelf: 'flex-end',
  gap: '5px',
  [theme.breakpoints.down('sm')]: {
    margin: '0',
    width: '100%',
    flexWrap: 'wrap',
  },
}))

export const SkillsWarpper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  width: '100%',
  marginBottom: '20px',
})

export const SkillItemWarpper = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
})

export const SkillItemButton = styled(Button)(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '8px',
  width: '100%',
  padding: '15px 17px',
  marginBottom: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: '40px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

export const SkillBar = styled(Box)<{proficiency: number}>(({
  proficiency,
  theme,
}) => {
  const proficiencyColors: {[key: number]: string} = {
    100: 'rgb(198, 48, 49)',
    80: 'rgb(255, 228, 158)',
    60: 'rgb(175, 205, 177)',
    40: 'rgb(158, 209, 237)',
    20: 'rgb(202, 202, 202)',
  }

  return {
    flexGrow: 1,
    height: '5px',
    width: '80px',
    backgroundColor: proficiencyColors[proficiency],
    marginRight: theme.spacing(1),
    transition: 'transform 0.4s linear',
    '&.transform': {
      animation: `${transformAnimation2} 1s forwards`,
    },
  }
})

const transformAnimation2 = keyframes`
  0% {
    background-color: inherit;
  }
  100% {
    background-color: rgb(202, 202, 202);
  }
`

const transformAnimation = keyframes`
  0% {
    width: var(--start-width);
  }
  100% {
    width: 0;
  }
`

const reverseTransformAnimation = keyframes`
  0% {
    width: 0;
  }
  100% {
    width: var(--end-width);
  }
`

export const SkillBarFilled = styled(Box)<{proficiency: number}>(({
  proficiency,
}) => {
  const color = getColorProficiency(proficiency)

  return {
    '--start-width': `${proficiency}%`,
    '--end-width': `${proficiency}%`,
    height: '5px',
    backgroundColor: color,
    width: 'var(--start-width)',
    '&.transform': {
      animation: `${transformAnimation} 1s forwards`,
    },
    '&.reverseTransform': {
      animation: `${reverseTransformAnimation} 1s forwards`,
    },
  }
})

export const EditBox = styled(Box)(({theme}) => ({
  marginLeft: '15px',
  backgroundColor: theme.palette.common.white,
  borderRadius: '40px',
  padding: '0 8px',
  color: theme.palette.error.main,
}))
