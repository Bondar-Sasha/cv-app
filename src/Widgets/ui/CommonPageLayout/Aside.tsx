import {ComponentProps, FC, memo, useRef, useState} from 'react'
import {useTheme} from '@mui/material/styles'
import {useLocation, useNavigate} from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import IconButton from '@mui/material/IconButton'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import SettingsIcon from '@mui/icons-material/Settings'
import LogoutIcon from '@mui/icons-material/Logout'

import layoutStyles from './styles/layout.module.css'
import {AppRouterMap, EnvUserLogo, useUser} from '@/Shared'
import AsideSvg from './assets/AsideSvg'
import {Box, Popover} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {AsideMarker, CustomPopoverButton} from './preparedUi'
import {useReactiveVar} from '@apollo/client'
import {refreshUserFunc} from './utils'

interface AsideMarkersMap {
  id: number
  icon: ComponentProps<typeof AsideSvg>['type']
  label: string
  handlingPath: string
}

const asideMarkersMap: AsideMarkersMap[] = [
  {
    id: 1,
    icon: 'users',
    label: 'Employees',
    handlingPath: AppRouterMap.users.path,
  },
  {
    id: 2,
    icon: 'up',
    label: 'Skills',
    handlingPath: AppRouterMap.skills.path,
  },
  {
    id: 3,
    icon: 'lang',
    label: 'Languages',
    handlingPath: AppRouterMap.languages.path,
  },
  {id: 4, icon: 'profile', label: 'CVs', handlingPath: AppRouterMap.CVs.path},
  {
    id: 5,
    icon: 'projects',
    label: 'Projects',
    handlingPath: AppRouterMap.projects.path,
  },
]

const Aside: FC = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const {t} = useTranslation()
  const {user} = useUser()
  const refreshUser = useReactiveVar(refreshUserFunc)
  const [asideState, setAsideState] = useState<boolean>(true)
  const [userMenuState, setUserMenu] = useState<boolean>(false)
  const userMenuAnchor = useRef<HTMLDivElement>(null)
  const changeAsideState = () => {
    setAsideState((prev) => !prev)
  }

  const handleLogout = async () => {
    localStorage.removeItem('userId')
    localStorage.removeItem('refreshToken')
    await refreshUser?.({userId: ''})
  }

  return (
    <aside
      className={`${layoutStyles.aside} ${asideState ? layoutStyles.asideOpened : layoutStyles.asideClosed}`}
    >
      <div className={layoutStyles.markerContainer}>
        {asideMarkersMap.map((marker) => {
          return (
            <AsideMarker
              key={marker.id}
              onClick={() => {
                void navigate(marker.handlingPath)
              }}
              isPicked={marker.handlingPath === location.pathname}
              className={layoutStyles.asideMarker}
            >
              <AsideSvg color={theme.palette.text.primary} type={marker.icon} />

              <span className={layoutStyles.asideMarkerLabel}>
                {t(marker.label)}
              </span>
            </AsideMarker>
          )
        })}
      </div>

      <Popover
        open={userMenuState}
        anchorEl={userMenuAnchor.current}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 190,
          horizontal: 20,
        }}
      >
        <Box
          width="200px"
          display="flex"
          gap="15px"
          padding="10px 0"
          flexDirection="column"
          color={theme.palette.text.primary}
          bgcolor={theme.palette.background.default}
        >
          <CustomPopoverButton
            sx={{padding: '10px'}}
            onClick={() => {
              void navigate(AppRouterMap.userProfile.path(user?.id))
              setUserMenu(!userMenuState)
            }}
          >
            <AccountCircleIcon sx={{marginRight: '10px'}} />
            {t('Profile')}
          </CustomPopoverButton>
          <CustomPopoverButton
            sx={{
              borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
              padding: '10px',
            }}
            onClick={() => {
              void navigate(AppRouterMap.settings.path)
              setUserMenu(!userMenuState)
            }}
          >
            <SettingsIcon sx={{marginRight: '10px'}} />
            {t('Settings')}
          </CustomPopoverButton>
          <CustomPopoverButton onClick={handleLogout}>
            <LogoutIcon sx={{marginRight: '10px', paddingLeft: '5px'}} />
            {t('Logout')}
          </CustomPopoverButton>
        </Box>
      </Popover>
      <div>
        <Box
          ref={userMenuAnchor}
          overflow="hidden"
          display="flex"
          alignItems="center"
          paddingLeft="10px"
          sx={{
            cursor: 'pointer',
          }}
          onClick={() => {
            setUserMenu((prev) => !prev)
          }}
        >
          <EnvUserLogo
            latter={user?.profile.first_name?.charAt(0) || user?.email[0] || ''}
            src={user?.profile?.avatar}
            bgColor="rgb(198, 48, 49)"
          />

          <Box
            component="span"
            textOverflow="ellipsis"
            marginLeft="10px"
            overflow="hidden"
          >
            {user?.profile.first_name || user?.email}
          </Box>
        </Box>

        <Box
          height="70px"
          display="flex"
          alignItems="center"
          paddingLeft="10px"
        >
          <IconButton
            onClick={changeAsideState}
            className={`${layoutStyles.asideIcon} ${
              asideState
                ? layoutStyles.asideIconOpened
                : layoutStyles.asideIconClosed
            }`}
          >
            <KeyboardArrowLeftIcon color="inherit" />
          </IconButton>
        </Box>
      </div>
    </aside>
  )
})

export default Aside
