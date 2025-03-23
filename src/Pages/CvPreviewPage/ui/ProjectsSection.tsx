import {
  LeftBox,
  RightBox,
  SectionBox,
  SubsectionTitle,
} from './StyledComponents'
import {Typography} from '@mui/material'
import {CvProject, User} from 'cv-graphql'
import {FC} from 'react'
import {converDate} from '../utilits/converDate'

interface ProjectsSectionProps {
  dataProject: CvProject
  refs: (el: HTMLDivElement | null) => void
  userInfo: User
}

const ProjectsSection: FC<ProjectsSectionProps> = ({
  dataProject,
  refs,
  userInfo,
}) => {
  return (
    <SectionBox ref={refs}>
      <LeftBox>
        <SubsectionTitle
          text={dataProject.project.name}
          sx={{color: 'rgb(198, 48, 49)', textTransform: 'uppercase'}}
        />
        <Typography variant="body1">
          {dataProject.project.description}
        </Typography>
      </LeftBox>

      <RightBox>
        <SubsectionTitle text="Project roles" />
        <Typography variant="body1">{userInfo.position?.name}</Typography>

        <SubsectionTitle text="Period" />
        <Typography variant="body1">
          {converDate(
            dataProject.project.start_date ?? '',
            dataProject.project.end_date ?? ''
          )}
        </Typography>

        <SubsectionTitle text="Responsibilities" />
        {dataProject.responsibilities.map((resp) => (
          <Typography key={resp} variant="body1">
            {resp}
          </Typography>
        ))}

        <SubsectionTitle text="Environment" />
        {dataProject.project.environment.map((env, index) => (
          <Typography key={env} variant="body1" component={'span'}>
            {`${env}${index === dataProject.project.environment.length - 1 ? '.' : ','} `}
          </Typography>
        ))}
      </RightBox>
    </SectionBox>
  )
}

export default ProjectsSection
