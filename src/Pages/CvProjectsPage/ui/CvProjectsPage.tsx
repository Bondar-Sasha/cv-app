import {useCV} from '@/Features'
import React, {FC, useEffect, useMemo, useState} from 'react'
import AddIcon from '@mui/icons-material/Add'
import {Box, TableCell, TableRow} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {Navigate, useNavigate, useParams} from 'react-router-dom'

import ProjectHandlerPopup from './ProjectHandlerPopup'
import {LoaderBackdrop, Params, useUser} from '@/Shared'
import MoreIconWithPopover from './MoreIconWithPopover'

import DeleteProjectPopover from './DeleteProjectPopover'
import {TableForProjects, useProjects} from '@/Widgets'
import {CustomBox, CustomButton} from './StyledElements'
import {useBreadCrumbsContext} from '@/App'

interface PopupState {
  projectName: string
  isCreating: boolean
  open: boolean
  start_date?: string
  end_date?: string | null
  responsibilities?: string[]
}

const initPopupState: PopupState = {
  projectName: '',
  isCreating: true,
  open: false,
}

interface DeleteCVProjectState {
  open: boolean
  projectId: string
  projectName: string
}

const initDeletePopupState: DeleteCVProjectState = {
  open: false,
  projectId: '',
  projectName: '',
}

const CvProjectsPage: FC = () => {
  const {t} = useTranslation()
  const {user} = useUser()
  const params = useParams<Params>()
  const navigate = useNavigate()
  const breadcrumb = useBreadCrumbsContext()
  const {data: cv, loading: cvLoading} = useCV(params?.cvId)
  const {data: availableProjects, loading: availableProjectsLoading} =
    useProjects()

  const [deletePopupState, setDeletePopup] =
    useState<DeleteCVProjectState>(initDeletePopupState)
  const handleCloseDeletePopup = () => {
    setDeletePopup(initDeletePopupState)
  }

  const [popupState, setPopup] = useState<PopupState>(initPopupState)

  const [selectedProjectState, setSelectedProject] = useState<string>('')
  const particularProject = useMemo(
    () =>
      availableProjects?.projects.find(
        (project) =>
          project.name === popupState.projectName ||
          project.id === selectedProjectState
      ),
    [availableProjects?.projects, popupState.projectName, selectedProjectState]
  )
  useEffect(() => {
    setSelectedProject(particularProject?.id || '')
  }, [particularProject?.id, popupState.projectName])

  const availableProjectsForSelect = useMemo(
    () =>
      availableProjects?.projects.filter(
        (project) =>
          !cv?.cv?.projects?.find((cvProd) => cvProd.name === project.name)
      ),
    [availableProjects?.projects, cv?.cv?.projects]
  )

  useEffect(() => {
    if (cv) {
      breadcrumb.setCurrentBread(cv.cv.name)
    }
  }, [cv, breadcrumb])

  useEffect(() => {
    if (cvLoading) {
      return
    }
    if (cv?.cv.user?.id !== user?.id) {
      void navigate('/')
    }
  }, [cv?.cv.user?.id, cvLoading, navigate, user?.id])

  if (cvLoading || availableProjectsLoading) {
    return <LoaderBackdrop loading />
  }

  if (!cv || !availableProjects) {
    return <Navigate to="/" />
  }

  const closePopup = () => {
    setPopup(initPopupState)
    setSelectedProject('')
  }

  return (
    <Box component="main" sx={{overflowX: 'auto'}}>
      <TableForProjects
        data={cv.cv.projects || []}
        addButton={
          <CustomButton
            disabled={availableProjectsForSelect?.length === 0}
            variant="text"
            onClick={() => {
              setPopup({open: true, isCreating: true, projectName: ''})
            }}
          >
            <AddIcon sx={{color: 'inherit', marginRight: '7px'}} />
            {t('Add project')}
          </CustomButton>
        }
      >
        {(project) => {
          if ('responsibilities' in project) {
            const preparedResponsibilities = project.responsibilities.join(' ')
            return (
              <React.Fragment key={project.id}>
                <TableRow key={project.id}>
                  <TableCell sx={{whiteSpace: 'nowrap'}}>
                    {project.name}
                  </TableCell>
                  <TableCell sx={{whiteSpace: 'nowrap'}}>
                    {project.domain}
                  </TableCell>
                  <TableCell>{project.start_date}</TableCell>
                  <TableCell>{project?.end_date || t('Till now')}</TableCell>
                  <TableCell align="right">
                    <MoreIconWithPopover
                      onUpdate={() => {
                        setPopup({
                          open: true,
                          isCreating: false,
                          projectName: project.name,
                          end_date: project.end_date,
                          start_date: project.start_date,
                          responsibilities: project.responsibilities,
                        })
                      }}
                      onDelete={() => {
                        const projectId = availableProjects.projects.find(
                          (projectForSearching) =>
                            project.name === projectForSearching.name
                        )?.id

                        if (!projectId) {
                          return
                        }

                        setDeletePopup({
                          projectId,
                          open: true,
                          projectName: project.name,
                        })
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
                      maxWidth: '300px',
                    }}
                    colSpan={6}
                  >
                    {project.description}
                  </TableCell>
                </TableRow>
                {preparedResponsibilities && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <CustomBox>{preparedResponsibilities}</CustomBox>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            )
          }
        }}
      </TableForProjects>
      <DeleteProjectPopover
        {...deletePopupState}
        onClose={handleCloseDeletePopup}
        cvId={cv.cv.id}
      />
      {popupState.open && (
        <ProjectHandlerPopup
          {...popupState}
          selectedProject={selectedProjectState}
          onSelect={setSelectedProject}
          projectsForSelect={
            (popupState.isCreating
              ? availableProjectsForSelect
              : availableProjects.projects
            )?.map((project) => ({
              value: project.id,
              label: project.name,
            })) || []
          }
          pickedProject={
            particularProject
              ? {
                  projectId: particularProject.id,
                  description: particularProject.description,
                  environment: particularProject.environment,
                  domain: particularProject.domain,
                }
              : undefined
          }
          onClose={closePopup}
          cvId={cv.cv.id}
        />
      )}
    </Box>
  )
}

export default CvProjectsPage
