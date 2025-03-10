import {InnerWrapper} from '@/Pages/ui/StyledComponents'
import {FC} from 'react'
import {Box} from '@mui/material'
import {StyledLinkList} from '@/Widgets'
import {AppRouterMap} from '@/Shared'

export interface OneUserLayoutProps {
  path: HeaderLinks
  page: React.ReactElement
}

export type HeaderLinks = 'profile' | 'skills' | 'languages'

const OneUserLayout: FC<OneUserLayoutProps> = ({path, page}) => {
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
    <>
      <Box sx={{marginLeft: '-27px'}}>
        <StyledLinkList arrLinks={links} />
      </Box>
      <InnerWrapper>{page}</InnerWrapper>
    </>
  )
}

export default OneUserLayout
