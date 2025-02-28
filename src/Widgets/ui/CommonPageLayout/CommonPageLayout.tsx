import {FC, useState} from 'react'
import {styled} from '@mui/material/styles'
import {Outlet, useLocation, useNavigate} from 'react-router-dom'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import IconButton from '@mui/material/IconButton'

import layoutStyles from './styles/layout.module.css'
import langIcon from './assets/lang.svg'
import usersIcon from './assets/users.svg'
import upIcon from './assets/up.svg'
import profileIcon from './assets/profile.svg'
import SettingsPage from '@/Pages/SettingsPage/ui/SettingsPage'

const Container = styled('div')(({theme}) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
}))

const asideMarkersMap = [
  {
    id: 1,
    icon: usersIcon,
    label: 'Employees',
    handlingPath: '/users',
  },
  {id: 2, icon: upIcon, label: 'Skills', handlingPath: '/skills'},
  {id: 3, icon: langIcon, label: 'Languages', handlingPath: '/languages'},
  {id: 4, icon: profileIcon, label: 'CVs', handlingPath: '/cvs'},
]

const CommonPageLayout: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()

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
                <img src={marker.icon} alt={marker.label} />
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
              <KeyboardArrowLeftIcon />
            </IconButton>
          </div>
        </div>
      </aside>
      <main className={layoutStyles.main}>
        <header className={layoutStyles.header}></header>
        <Outlet />
        <SettingsPage />
      </main>
    </Container>
  )
}

export default CommonPageLayout
