import {FC} from 'react'
import {Box, styled} from '@mui/material'
import {StyledLinkList} from '@/Widgets'
import {AppRouterMap} from '@/Shared'
import {useLocation, useParams} from 'react-router-dom'

export interface CvLayoutProps {
  page: React.ReactElement
}

export const Container = styled(Box)(({theme}) => ({
  marginLeft: '-27px',
  position: 'sticky',
  top: '0',
  left: '0',
  zIndex: theme.zIndex.drawer + 1,
  background:
    theme.palette.mode === 'light'
      ? 'linear-gradient(0deg, rgba(245,245,247,0) 0%, rgba(245,245,247,1) 60%)'
      : 'linear-gradient(0deg, rgba(53, 53, 53, 0) 0%, rgba(53, 53, 53, 1) 60%)',
  '@media (max-width: 768px)': {
    marginLeft: '0',
  },
}))

const CvLayout: FC<CvLayoutProps> = ({page}) => {
  const {cvId} = useParams()
  const path = useLocation().pathname.split('/').at(-1)

  const links = [
    {
      to: AppRouterMap.CVDetails.path(cvId),
      label: 'Details',
      active: path === 'details',
    },
    {
      to: AppRouterMap.CVSkills.path(cvId),
      label: 'Skills',
      active: path === 'skills',
    },
    {
      to: AppRouterMap.CVProjects.path(cvId),
      label: 'Projects',
      active: path === 'projects',
    },
    {
      to: AppRouterMap.CVPreview.path(cvId),
      label: 'Preview',
      active: path === 'preview',
    },
  ]

  return (
    <Box sx={{position: 'relative'}}>
      <Container>
        <StyledLinkList arrLinks={links} />
      </Container>
      {page}
    </Box>
  )
}

export default CvLayout
