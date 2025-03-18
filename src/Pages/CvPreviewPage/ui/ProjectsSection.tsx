import {TypographyTitle} from '@/Shared'
import {
  LeftBox,
  RightBox,
  SectionBox,
  SubsectionTitle,
} from './StyledComponents'
import {Typography} from '@mui/material'

const ProjectsSection = () => {
  return (
    <>
      <SectionBox>
        <TypographyTitle title="Projects" sx={{marginBottom: '0'}} />
      </SectionBox>
      <SectionBox>
        <LeftBox>
          <SubsectionTitle
            text="Virtual Tours"
            sx={{color: 'rgb(198, 48, 49)', textTransform: 'uppercase'}}
          />
          <Typography variant="body1">
            The project gives the opportunity to walk by virtual places such as
            furniture stores, museums, galleries, premises for sale and see
            objects captured from reality or added through AR. Users can chat
            with agents. Agents have the opportunity to be followed by clients
            and propose products in chat. Another part of the application allows
            guides to hold excursions for a large number of concurrent users.
          </Typography>
        </LeftBox>

        <RightBox>
          <SubsectionTitle text="Project roles" />
          <Typography variant="body1">all roles</Typography>

          <SubsectionTitle text="Period" />
          <Typography variant="body1">02.2019 – 11.2023</Typography>

          <SubsectionTitle text="Responsibilities" />
          <Typography variant="body1">my responsibilities</Typography>

          <SubsectionTitle text="Environment" />
          <Typography variant="body1">
            JavaScript, TypeScript, React, PostgreSQL, Node.js, MobX, Three.js,
            WebSockets, Git, Material UI.
          </Typography>
        </RightBox>
      </SectionBox>
    </>
  )
}

export default ProjectsSection
