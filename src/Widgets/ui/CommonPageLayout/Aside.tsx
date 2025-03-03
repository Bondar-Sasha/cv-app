import {ComponentProps, FC, memo, useState} from 'react'
import {styled, useTheme} from '@mui/material/styles'
import {useLocation, useNavigate} from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import IconButton from '@mui/material/IconButton'

import layoutStyles from './styles/layout.module.css'
import {AppRouterMap} from '@/Shared'
import AsideSvg from './assets/AsideSvg'
import {Box} from '@mui/material'
import {useTranslation} from 'react-i18next'

interface AsideMarkerProps {
  isPicked: boolean
}

const AsideMarker = styled('div')<AsideMarkerProps>(({theme, isPicked}) => {
  const colorsMap = {
    light: 'rgba(0, 0, 0, 0.04)',
    dark: 'rgba(255, 255, 255, 0.08)',
  }

  return {
    ':hover': {
      background: colorsMap[theme.palette.mode],
    },
    backgroundColor: isPicked ? colorsMap[theme.palette.mode] : '',
  }
})

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
]

const Aside: FC = memo(() => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()
  const {t} = useTranslation()

  const [asideState, setAsideState] = useState<boolean>(true)
  const changeAsideState = () => {
    setAsideState((prev) => !prev)
  }

  return (
    <aside
      className={`${layoutStyles.aside} ${asideState ? layoutStyles.asideOpened : layoutStyles.asideClosed}`}
    >
      <div>
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

              <span>{t(marker.label)}</span>
            </AsideMarker>
          )
        })}
      </div>
      <div>
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
