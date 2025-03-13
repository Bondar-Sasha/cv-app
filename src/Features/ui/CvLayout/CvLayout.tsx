import {FC} from 'react'
import {Box} from '@mui/material'
import {StyledLinkList} from '@/Widgets'
import {AppRouterMap} from '@/Shared'
import {useParams} from 'react-router-dom'

export interface CvLayoutProps {
  path: HeaderLinks
  page: React.ReactElement
}

export type HeaderLinks = 'details' | 'skills' | 'projects' | 'preview'

const CvLayout: FC<CvLayoutProps> = ({path, page}) => {
  const id = useParams().cvId

  const links = [
    {
      to: AppRouterMap.CVDetails.path(id),
      label: 'Details',
      active: path === 'details',
    },
    {
      to: AppRouterMap.CVSkills.path(id),
      label: 'Skills',
      active: path === 'skills',
    },
    {
      to: AppRouterMap.CVProjects.path(id),
      label: 'Projects',
      active: path === 'projects',
    },
    {
      to: AppRouterMap.CVPreview.path(id),
      label: 'Preview',
      active: path === 'preview',
    },
  ]

  return (
    <Box>
      <Box sx={{marginLeft: '-27px'}}>
        <StyledLinkList arrLinks={links} />
      </Box>
      {page}
    </Box>
  )
}

export default CvLayout
