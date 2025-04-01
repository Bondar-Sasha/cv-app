import {TypographyTitle} from '@/Shared'
import {
  CustomBox,
  LeftBox,
  RightBox,
  SectionBox,
  StyledButtonRed,
  SubsectionTitle,
} from './StyledComponents'
import {Typography} from '@mui/material'
import {FC} from 'react'
import {Cv, Profile} from 'cv-graphql'

interface MainInfoProps {
  cvData: Cv
  btnId: string
  handleExport: () => void
  userInfo: Profile
}

const MainInfo: FC<MainInfoProps> = ({
  cvData,
  btnId,
  handleExport,
  userInfo,
}) => {
  return (
    <CustomBox>
      <SectionBox sx={{justifyContent: 'space-between', alignItems: 'center'}}>
        <TypographyTitle
          title={userInfo.full_name ?? ''}
          sx={{marginBottom: '0'}}
        />
        <StyledButtonRed id={btnId} variant="outlined" onClick={handleExport}>
          Export pdf
        </StyledButtonRed>
      </SectionBox>

      <SectionBox>
        <LeftBox>
          <SubsectionTitle text="Education" />
          <Typography variant="body1">{cvData.education}</Typography>

          <SubsectionTitle text="Language proficiency" />
          {userInfo.languages.map((lang) => (
            <Typography key={lang.name} variant="body1">
              {lang.name} - {lang.proficiency}
            </Typography>
          ))}

          <SubsectionTitle text="Domains" />
          {cvData.projects?.map((elem) => (
            <Typography key={crypto.randomUUID()} variant="body1">
              {elem.project.domain}
            </Typography>
          ))}
        </LeftBox>

        <RightBox>
          <SubsectionTitle text={cvData.name} />
          <Typography variant="body1">{cvData.description}</Typography>

          <SubsectionTitle text="Technologies" />
          {cvData.skills.map((elem, index) => (
            <Typography key={elem.name} variant="body1" component={'span'}>
              {`${elem.name}${index === cvData.skills.length - 1 ? '.' : ','} `}
            </Typography>
          ))}
        </RightBox>
      </SectionBox>
    </CustomBox>
  )
}

export default MainInfo
