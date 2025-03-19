import {TypographyTitle} from '@/Shared'
import {
  LeftBox,
  RightBox,
  SectionBox,
  StyledButtonRed,
  SubsectionTitle,
} from './StyledComponents'
import {Box, Typography} from '@mui/material'
import {FC} from 'react'

import {Cv} from 'cv-graphql'

interface MainInfoProps {
  cvData: Cv
  btnId: string
  handleExport: () => void
}

const MainInfo: FC<MainInfoProps> = ({cvData, btnId, handleExport}) => {
  return (
    <Box sx={{width: '100%'}}>
      <SectionBox>
        <TypographyTitle title="Nata Stadnik" sx={{marginBottom: '0'}} />
        <StyledButtonRed id={btnId} variant="outlined" onClick={handleExport}>
          Export pdf
        </StyledButtonRed>
      </SectionBox>

      <SectionBox>
        <LeftBox>
          <SubsectionTitle text="Education" />
          <Typography variant="body1">{cvData.education}</Typography>

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
          <SubsectionTitle text={cvData.name} />
          <Typography variant="body1">{cvData.description}</Typography>

          <SubsectionTitle text="Programming languages" />
          <Typography variant="body1">
            TypeScript, Python, JavaScript.
          </Typography>

          <SubsectionTitle text="Frontend" />
          <Typography variant="body1">React, Redux, MobX, Angular.</Typography>
        </RightBox>
      </SectionBox>
    </Box>
  )
}

export default MainInfo
