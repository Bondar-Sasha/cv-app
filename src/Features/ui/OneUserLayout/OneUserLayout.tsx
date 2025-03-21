import {InnerWrapper} from '@/Pages/ui/StyledComponents'
import {FC} from 'react'
import {Box} from '@mui/material'
import {StyledLinkList} from '@/Widgets'
import {AppRouterMap} from '@/Shared'
import {useParams} from 'react-router-dom'

export interface OneUserLayoutProps {
  path: HeaderLinks
  page: React.ReactElement
  sx?: object
}

export type HeaderLinks = 'profile' | 'skills' | 'languages'

const OneUserLayout: FC<OneUserLayoutProps> = ({path, page, sx}) => {
  const id = useParams().userId

  const links = [
    {
      to: AppRouterMap.userProfile.path(id),
      label: 'Profile',
      active: path === 'profile',
    },
    {
      to: AppRouterMap.userSkills.path(id),
      label: 'Skills',
      active: path === 'skills',
    },
    {
      to: AppRouterMap.userLanguages.path(id),
      label: 'Languages',
      active: path === 'languages',
    },
  ]

  return (
    <Box sx={{overflowX: 'hidden'}}>
      <Box sx={{marginLeft: '-27px'}}>
        <StyledLinkList arrLinks={links} />
      </Box>
      <InnerWrapper sx={sx}>{page}</InnerWrapper>
    </Box>
  )
}

export default OneUserLayout
