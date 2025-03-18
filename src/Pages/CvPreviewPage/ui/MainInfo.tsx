import {TypographyTitle} from '@/Shared'
import {
  LeftBox,
  RightBox,
  SectionBox,
  StyledButtonRed,
  SubsectionTitle,
} from './StyledComponents'
import {Typography} from '@mui/material'

const MainInfo = () => {
  return (
    <>
      <SectionBox>
        <TypographyTitle title="Nata Stadnik" sx={{marginBottom: '0'}} />
        <StyledButtonRed variant="outlined">Export pdf</StyledButtonRed>
      </SectionBox>

      <SectionBox>
        <LeftBox>
          <SubsectionTitle text="Education" />
          <Typography variant="body1">My education details</Typography>

          <SubsectionTitle text="Language proficiency" />
          <Typography variant="body1">Polish — B2</Typography>
          <Typography variant="body1">Italian — A1</Typography>
          <Typography variant="body1">German — A1</Typography>

          <SubsectionTitle text="Domains" />
          <Typography variant="body1">
            AR (Augmented Reality), Education
          </Typography>
        </LeftBox>

        <RightBox>
          <SubsectionTitle text="Details name" />
          <Typography variant="body1">My description detils</Typography>

          <SubsectionTitle text="Programming languages" />
          <Typography variant="body1">
            TypeScript, Python, JavaScript.
          </Typography>

          <SubsectionTitle text="Frontend" />
          <Typography variant="body1">React, Redux, MobX, Angular.</Typography>
        </RightBox>
      </SectionBox>
    </>
  )
}

export default MainInfo
