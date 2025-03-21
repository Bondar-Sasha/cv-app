import React, {FC, useEffect} from 'react'
import {Box, TableCell, TableRow} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import MoreIconWithPopover from './MoreIconWithPopover'
import {useTranslation} from 'react-i18next'

import {AppRouterMap, LoaderBackdrop} from '@/Shared'
import {TableForProjects, useProjects} from '@/Widgets'

const ProjectsPage: FC = () => {
  const navigate = useNavigate()
  const {t} = useTranslation()
  const {data, loading} = useProjects()

  useEffect(() => {
    if (loading) {
      return
    }
    if (!data) {
      void navigate('/')
    }
  }, [loading, data, navigate])

  if (loading) {
    return <LoaderBackdrop loading />
  }

  if (!data) {
    return <div>404</div>
  }

  return (
    <Box component="main" sx={{overflowX: 'auto'}}>
      <TableForProjects data={data.projects || []}>
        {(project) => {
          return (
            <React.Fragment key={project.id}>
              <TableRow key={project.id}>
                <TableCell>{project.name}</TableCell>
                <TableCell>{project.domain}</TableCell>
                <TableCell>{project.start_date}</TableCell>
                <TableCell>{project?.end_date || t('Till now')}</TableCell>
                <TableCell align="right">
                  <MoreIconWithPopover
                    onDetails={() => {
                      void navigate(AppRouterMap.project.path(project.id))
                    }}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  sx={{
                    padding: 0,
                    paddingRight: '16px',
                    textAlign: 'justify',
                    opacity: 0.5,
                  }}
                  colSpan={5}
                >
                  {project.description}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={6}>
                  <Box display="flex" flexWrap="wrap">
                    {project.environment.map((env) => {
                      return (
                        <Box
                          key={env}
                          marginBottom="7px"
                          marginRight="7px"
                          width="fit-content"
                          padding="0 7px"
                          height="20px"
                          borderRadius="10px"
                          border="1px solid rgb(189, 189, 189)"
                        >
                          {env}
                        </Box>
                      )
                    })}
                  </Box>
                </TableCell>
              </TableRow>
            </React.Fragment>
          )
        }}
      </TableForProjects>
    </Box>
  )
}

export default ProjectsPage
