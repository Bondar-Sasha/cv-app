import {StyledButton} from '@/Shared'
import {Box, Button, styled, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

interface SkillItemProps {
  name: string
  proficiency: number
}

interface SkillItemProps {
  name: string
  proficiency: number
  color: string
  onClick?: () => void
}

const SkillItemButton = styled(Button)<SkillItemProps>(({theme}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  padding: '10px 15px',
  marginBottom: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
  borderRadius: '40px',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}))

const SkillBar = styled(Box)<{proficiency: number}>(({proficiency, theme}) => {
  let color
  if (proficiency === 100) {
    color = 'rgb(198, 48, 49)'
  } else if (proficiency === 80) {
    color = 'rgb(255, 228, 158)'
  } else if (proficiency === 60) {
    color = 'rgb(175, 205, 177)'
  } else if (proficiency === 40) {
    color = 'rgb(158, 209, 237)'
  } else {
    color = 'rgb(202, 202, 202)'
  }

  return {
    flexGrow: 1,
    height: '5px',
    width: '80px',
    backgroundColor: color,
    marginRight: theme.spacing(1),
  }
})

const SkillBarFilled = styled(Box)<{proficiency: number}>(({proficiency}) => {
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
    width: `${proficiency}%`,
    height: '5px',
    backgroundColor: color,
  }
})

const SkillItem: React.FC<SkillItemProps> = ({name, proficiency, onClick}) => (
  <SkillItemButton
    onClick={onClick}
    name={''}
    proficiency={0}
    sx={{gap: '8px'}}
  >
    <Box display="flex" alignItems="center">
      <SkillBar proficiency={proficiency}>
        <SkillBarFilled proficiency={proficiency} />
      </SkillBar>
    </Box>
    <Typography textAlign={'left'}>{name}</Typography>
  </SkillItemButton>
)

const AllSkills = () => {
  const {t} = useTranslation()
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          width: '100%',
          marginBottom: '25px',
        }}
      >
        <Typography variant="h6" fontSize={'1rem'}>
          {t('Programming languages')}
        </Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          <Box flexBasis={'33%'}>
            <SkillItem name="JavaScript" proficiency={20} color="red" />
          </Box>
          <Box flexBasis={'33%'}>
            <SkillItem name="TypeScript" proficiency={40} color="yellow" />
          </Box>
          <Box flexBasis={'33%'}>
            <SkillItem name="TypeScript" proficiency={60} color="yellow" />
          </Box>
          {/* <Box flexBasis={'33%'}>
            <SkillItem name="TypeScript" proficiency={40} color="yellow" />
          </Box> */}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          width: '100%',
          marginBottom: '25px',
        }}
      >
        <Typography variant="h6" fontSize={'1rem'}>
          {t('Frontend')}
        </Typography>
        <Box sx={{display: 'flex', flexWrap: 'wrap'}}>
          <Box flexBasis={'33%'}>
            <SkillItem name="HTML5" proficiency={80} color="red" />
          </Box>
          <Box flexBasis={'33%'}>
            <SkillItem name="CSS3" proficiency={40} color="yellow" />
          </Box>
          <Box flexBasis={'33%'}>
            <SkillItem name="React" proficiency={100} color="yellow" />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          marginLeft: 'auto',
          paddingTop: '10px',
          gap: '70px',
        }}
      >
        <StyledButton>
          <AddIcon style={{marginRight: '8px'}} /> {t('Add skill')}
        </StyledButton>
        <StyledButton
          sx={{
            whiteSpace: 'nowrap',
            // Padding: '10px 40px',
            color: 'rgb(198, 48, 49)',
          }}
        >
          <DeleteIcon style={{marginRight: '8px'}} /> {t('Remove skills')}
        </StyledButton>
      </Box>
    </>
  )
}

export default AllSkills
