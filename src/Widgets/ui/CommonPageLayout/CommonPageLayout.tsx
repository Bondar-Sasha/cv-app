import {ComponentProps, FC, useState} from 'react'
import {styled, useTheme} from '@mui/material/styles'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import IconButton from '@mui/material/IconButton'

import layoutStyles from './styles/layout.module.css'

import {AppRouterMap} from '@/Shared'
import AsideSvg from './assets/AsideSvg'

const Container = styled('div')(({theme}) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}))

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

const CommonPageLayout: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useTheme()

  const [asideState, setAsideState] = useState<boolean>(true)
  const changeAsideState = () => {
    setAsideState((prev) => !prev)
  }
  return (
    <Container className={layoutStyles.layout_container}>
      <aside
        className={`${layoutStyles.aside} ${asideState ? layoutStyles.asideOpened : layoutStyles.asideClosed}`}
      >
        <div>
          {asideMarkersMap.map((marker) => {
            return (
              <div
                key={marker.id}
                onClick={() => {
                  void navigate(marker.handlingPath)
                }}
                className={`${layoutStyles.asideMarker} ${marker.handlingPath === location.pathname ? layoutStyles.picked : ''}`}
              >
                <AsideSvg
                  color={theme.palette.text.primary}
                  type={marker.icon}
                />

                <span>{marker.label}</span>
              </div>
            )
          })}
        </div>
        <div>
          <div>
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
          </div>
        </div>
      </aside>
      <main className={layoutStyles.main}>
        <header className={layoutStyles.header}></header>
        <Outlet />
      </main>
    </Container>
  )
}

export default CommonPageLayout
