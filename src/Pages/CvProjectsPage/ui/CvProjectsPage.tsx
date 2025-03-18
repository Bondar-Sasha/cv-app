import {CvLayout, useCV} from '@/Features'
import React, {FC, useEffect, useMemo, useState} from 'react'
import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'

import ProjectHandlerPopup from './ProjectHandlerPopup'
import {
  LoaderBackdrop,
  Params,
  SearchInput,
  useDebounceSearch,
  useUser,
} from '@/Shared'
import {CustomArrow} from '@/Pages/ui'
import {useProjects} from '../api'
import MoreIconWithPopover from './MoreIconWithPopover'
import {CvProject} from 'cv-graphql'
import DeleteProjectPopover from './DeleteProjectPopover'

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

interface Filters {
  searchState: string
  currentFilter: {
    id: 'name' | 'domain' | 'end_date' | 'start_date'
    state: boolean
  }
}

interface THeadItem {
  id: Filters['currentFilter']['id']
  label: string
}

const THeadItems: THeadItem[] = [
  {id: 'name', label: 'Name'},
  {id: 'domain', label: 'Domain'},
  {id: 'end_date', label: 'End Date'},
  {id: 'start_date', label: 'Start Date'},
]

const filterFunc = (data?: CvProject[] | null) => {
  return (curFilter: Filters['currentFilter']['id'], filterState: boolean) => {
    return (str: string): CvProject[] | null | undefined => {
      if (!data) return null

      return data
        .filter((project) =>
          project.name.toLowerCase().includes(str.toLowerCase())
        )
        .sort((a, b) => {
          const aValue = a[curFilter]
          const bValue = b[curFilter]

          if (!aValue || !bValue) return 0

          const aIsDate = !isNaN(Date.parse(aValue))
          const bIsDate = !isNaN(Date.parse(bValue))

          if (aIsDate && bIsDate) {
            const dateA = new Date(aValue)
            const dateB = new Date(bValue)
            return filterState
              ? dateA.getTime() - dateB.getTime()
              : dateB.getTime() - dateA.getTime()
          } else {
            const aStr = (aValue?.toString() || '').toLowerCase()
            const bStr = (bValue?.toString() || '').toLowerCase()
            return filterState
              ? aStr.localeCompare(bStr)
              : bStr.localeCompare(aStr)
          }
        })
    }
  }
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
  const {data: cv, loading: cvLoading} = useCV(params?.cvId)
  const {data: availableProjects, loading: availableProjectsLoading} =
    useProjects()

  const [deletePopupState, setDeletePopup] =
    useState<DeleteCVProjectState>(initDeletePopupState)
  const handleCloseDeletePopup = () => {
    setDeletePopup(initDeletePopupState)
  }

  const [popupState, setPopup] = useState<PopupState>(initPopupState)
  const [filtersState, setFilters] = useState<Filters>({
    searchState: '',
    currentFilter: {
      id: 'name',
      state: false,
    },
  })
  const debouncedSearchState = useDebounceSearch(filtersState.searchState, 500)

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
    if (cvLoading) {
      return
    }
    if (cv?.cv.user?.id !== user?.id) {
      void navigate('/')
    }
  }, [cv?.cv.user?.id, cvLoading, navigate, user?.id])

  const filteredData = useMemo(() => {
    return filterFunc(cv?.cv.projects)(
      filtersState.currentFilter.id,
      filtersState.currentFilter.state
    )(debouncedSearchState)
  }, [
    cv?.cv.projects,
    debouncedSearchState,
    filtersState.currentFilter.id,
    filtersState.currentFilter.state,
  ])
  if (cvLoading || availableProjectsLoading) {
    return <LoaderBackdrop loading />
  }

  if (!cv || !availableProjects) {
    return <div>404</div>
  }

  const closePopup = () => {
    setPopup(initPopupState)
    setSelectedProject('')
  }

  const toggleFilter = (id: Filters['currentFilter']['id']) => {
    setFilters((prev) => ({
      searchState: prev.searchState,
      currentFilter: {
        id,
        state: prev.currentFilter.id === id ? !prev.currentFilter.state : true,
      },
    }))
  }

  return (
    <CvLayout
      path="projects"
      page={
        <Box component="main" sx={{overflowX: 'auto'}}>
          <Table
            sx={{
              bgcolor: 'inherit',
              color: 'inherit',
              '& :is(td,th)': {paddingLeft: 0, border: 'none'},
            }}
          >
            <Box
              component={TableHead}
              position="sticky"
              top="0px"
              height="58px"
              zIndex="100"
              bgcolor="inherit"
            >
              <TableRow sx={{height: '56px'}}>
                <TableCell colSpan={3}>
                  <SearchInput
                    value={filtersState.searchState}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        searchState: e.target.value,
                      }))
                    }
                    variant="outlined"
                    placeholder="Search..."
                  />
                </TableCell>
                <TableCell
                  align="right"
                  colSpan={3}
                  sx={{
                    display: 'flex',
                    justifyContent: 'end',
                  }}
                >
                  <Button
                    disabled={availableProjectsForSelect?.length === 0}
                    variant="text"
                    onClick={() => {
                      setPopup({open: true, isCreating: true, projectName: ''})
                    }}
                    sx={{
                      color: 'rgb(198, 48, 49)',
                      width: '220px',
                      height: '40px',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      '&:hover': {
                        backgroundColor: 'rgb(236, 209, 210)',
                      },
                    }}
                  >
                    <AddIcon sx={{color: 'inherit', marginRight: '7px'}} />
                    {t('Add Project')}
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                {THeadItems.map((item) => (
                  <TableCell
                    align="left"
                    key={item.id}
                    sx={{cursor: 'pointer'}}
                    onClick={() => toggleFilter(item.id)}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      fontSize="15px"
                      whiteSpace="nowrap"
                    >
                      <span>{t(item.label)}</span>
                      <CustomArrow
                        arrowState={
                          filtersState.currentFilter.id === item.id
                            ? filtersState.currentFilter.state
                            : null
                        }
                      />
                    </Box>
                  </TableCell>
                ))}
                <TableCell
                  sx={{padding: 0, border: 'none'}}
                  width="72px"
                ></TableCell>
              </TableRow>
            </Box>
            <TableBody>
              {filteredData?.map((project) => {
                const preparedResponsibilities =
                  project.responsibilities.join(' ')
                return (
                  <React.Fragment key={project.id}>
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.domain}</TableCell>
                      <TableCell>{project.start_date}</TableCell>
                      <TableCell>{project?.end_date}</TableCell>
                      <TableCell align="right">
                        <MoreIconWithPopover
                          onMoreClick={() => {}}
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
                        }}
                        colSpan={5}
                      >
                        {project.description}
                      </TableCell>
                    </TableRow>
                    {preparedResponsibilities && (
                      <TableRow>
                        <TableCell colSpan={5}>
                          <Box
                            sx={{
                              borderRadius: '10px',
                              height: '20px',
                              bgcolor: 'rgb(228, 228, 228)',
                              width: 'fit-content',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              padding: ' 0 7px',
                              maxWidth: '300px',
                            }}
                          >
                            {preparedResponsibilities}
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                )
              })}
            </TableBody>
          </Table>
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
      }
    />
  )
}

export default CvProjectsPage
