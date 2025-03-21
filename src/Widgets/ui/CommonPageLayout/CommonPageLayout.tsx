import {FC, isValidElement} from 'react'
import {Outlet, useLocation, Link} from 'react-router-dom'
import {BreadcrumbsRoute, getBreadcrumbs} from 'use-react-router-breadcrumbs'
import CustomLink from '@mui/material/Link'
import {Box, Breadcrumbs} from '@mui/material'
import {useTranslation} from 'react-i18next'

import layoutStyles from './styles/layout.module.css'
import {AppRouterMap} from '@/Shared'
import Aside from './Aside'
import {ResponsiveBox} from './preparedUi'

const preparedRoutes: BreadcrumbsRoute[] = Object.keys(AppRouterMap)
  .map((item) => {
    const myRoute = AppRouterMap[item as keyof typeof AppRouterMap]

    if (!myRoute) {
      return undefined
    }

    return {
      path: typeof myRoute.path === 'function' ? myRoute.path() : myRoute.path,
      breadcrumb: myRoute.label,
    }
  })
  .filter((route) => route !== undefined)

const CommonPageLayout: FC = () => {
  const location = useLocation()
  const {t} = useTranslation()

  const breadcrumbs = getBreadcrumbs({location, routes: preparedRoutes}).filter(
    ({match}) => match.pathname !== '/'
  )

  return (
    <ResponsiveBox>
      <Aside />
      <Box boxSizing="border-box" overflow="scroll">
        <div className={layoutStyles.main_wrapper}>
          <Box
            component={'header'}
            className={layoutStyles.header}
            sx={{
              '@media (width <= 768px)': {
                paddingLeft: '0',
              },
            }}
          >
            <Breadcrumbs
              separator=">"
              aria-label="breadcrumb"
              sx={{
                paddingLeft: '20px',
                '@media (width <= 768px)': {
                  paddingLeft: '0',
                },
              }}
            >
              {breadcrumbs.map(({breadcrumb, match}) => (
                <CustomLink
                  component={Link}
                  to={match.pathname}
                  key={match.pathname}
                  underline="hover"
                  color="inherit"
                >
                  {isValidElement(breadcrumb) && t(breadcrumb.props.children)}
                </CustomLink>
              ))}
            </Breadcrumbs>
          </Box>
          <Outlet />
        </div>
      </Box>
    </ResponsiveBox>
  )
}

export default CommonPageLayout
