import {AppRouterMap} from '@/Shared'
import {StyledLinkList} from '@/Widgets'
import {Box} from '@mui/material'
import {FC} from 'react'

export type HeaderLinks = 'profile' | 'skills' | 'languages'

interface HeaderUserPageProps {
  path: HeaderLinks
}

const HeaderUserPage: FC<HeaderUserPageProps> = ({path}) => {
  const links = [
    {
      to: AppRouterMap.userProfile.path(),
      label: 'Profile',
      active: path === 'profile',
    },
    {
      to: AppRouterMap.userSkills.path(),
      label: 'Skills',
      active: path === 'skills',
    },
    {
      to: AppRouterMap.userLanguages.path(),
      label: 'Languages',
      active: path === 'languages',
    },
  ]

  return (
    <Box sx={{marginLeft: '-27px'}}>
      <StyledLinkList arrLinks={links} />
    </Box>
  )
}

export default HeaderUserPage
