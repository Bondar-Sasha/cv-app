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
  let color
  switch (proficiency) {
    case 100:
      color = 'rgb(198, 48, 49)'
      break
    case 80:
      color = 'rgb(255, 228, 158)'
      break
    case 60:
      color = 'rgb(175, 205, 177)'
      break
    case 40:
      color = 'rgb(158, 209, 237)'
      break
    default:
      color = 'rgb(202, 202, 202)'
      break
  }

  return {
    flexGrow: 1,
    height: '5px',
    width: '80px',
    backgroundColor: color,
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
  let color
  if (proficiency === 100) {
    color = 'rgb(198, 48, 49)'
  } else if (proficiency === 80) {
    color = 'rgb(255, 184, 0)'
  } else if (proficiency === 60) {
    color = 'rgb(46, 125, 50)'
  } else if (proficiency === 40) {
    color = 'rgb(2, 136, 209)'
  } else {
    color = 'rgb(118, 118, 118)'
  }

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
