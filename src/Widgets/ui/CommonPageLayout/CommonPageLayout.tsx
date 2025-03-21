import {FC} from 'react'
import {Outlet} from 'react-router-dom'

import layoutStyles from './styles/layout.module.css'
import Aside from './Aside'
import {ResponsiveBox} from './preparedUi'
import MyBreadcrumbs from './MyBreadcrumbs'

const CommonPageLayout: FC = () => {
  return (
    <ResponsiveBox>
      <Aside />

      <div className={layoutStyles.main_wrapper}>
        <header className={layoutStyles.header}>
          <MyBreadcrumbs />
        </header>
        <Outlet />
      </div>
    </ResponsiveBox>
  )
}

export default CommonPageLayout
