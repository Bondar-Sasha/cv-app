import {FC} from 'react'
import {Box} from '@mui/material'
import {StyledLinkList} from '@/Widgets'
import {AppRouterMap} from '@/Shared'

export interface CvLayoutProps {
  path: HeaderLinks
  page: React.ReactElement
}

export type HeaderLinks = 'details' | 'skills' | 'projects' | 'preview'

const CvLayout: FC<CvLayoutProps> = ({path, page}) => {
  const links = [
    {
      to: AppRouterMap.CVDetails.path(),
      label: 'Details',
      active: path === 'details',
    },
    {
      to: AppRouterMap.CVSkills.path(),
      label: 'Skills',
      active: path === 'skills',
    },
    {
      to: AppRouterMap.CVProjects.path(),
      label: 'Projects',
      active: path === 'projects',
    },
    {
      to: AppRouterMap.CVPreview.path(),
      label: 'Preview',
      active: path === 'preview',
    },
  ]

  return (
    <>
      <Box sx={{marginLeft: '-27px'}}>
        <StyledLinkList arrLinks={links} />
      </Box>
      {page}
    </>
  )
}

export default CvLayout
