import {Dispatch, FC, SetStateAction} from 'react'
import {
  Popover,
  Backdrop,
  Box,
  TextField,
  IconButton,
  SelectChangeEvent,
  FormControl,
  FormHelperText,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import {SubmitHandler, useForm} from 'react-hook-form'
import {z} from 'zod'
import {toast} from 'react-toastify'

import {CustomSelectComponent, CustomTextField, StyledButton} from '@/Shared'
import EnvSelect from './EnvSelect'
import {zodResolver} from '@hookform/resolvers/zod'
import {useAddCvProject, useUpdateCvProject} from '../api'
import {AddCvProjectInput} from 'cv-graphql'
import {Params, useParams} from 'react-router-dom'
import {CustomDate, SelectWrapper} from './StyledElements'

interface PreparedProject {
  projectId: string
  description: string
  environment: string[]
  domain: string
}

interface ProjectHandlerPopupProps {
  start_date?: string
  end_date?: string | null
  responsibilities?: string[]
  pickedProject?: PreparedProject

  cvId: string
  isCreating: boolean
  open: boolean
  projectsForSelect: {value: string; label: string}[]
  onSelect: Dispatch<SetStateAction<string>>
  selectedProject: string
  onClose: () => void
}

const ProjectHandlerPopup: FC<ProjectHandlerPopupProps> = ({
  open,
  onClose,
  isCreating,
  cvId,
  pickedProject,
  projectsForSelect,
  start_date,
  end_date,
  responsibilities,
  selectedProject,
  onSelect,
}) => {
  const params = useParams<Params>()
  const {t} = useTranslation()
  const [addCVProject, {loading: addingLoading}] = useAddCvProject(params.cvId)
  const [updateCVProject, {loading: updatingLoading}] = useUpdateCvProject(
    params.cvId
  )

  const FormSchema = z.object({
    projectId: z.string().nonempty(t('Pick a project')),
    start_date: z.string().nonempty(t('Start date is required')),
    end_date: z.string(),
    responsibilities: z.string().optional(),
  })

  type FormFields = z.infer<typeof FormSchema>

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    clearErrors,
    formState: {errors},
  } = useForm<FormFields>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectId: pickedProject?.projectId || '',
      start_date: start_date || '',
      end_date: end_date || '',
      responsibilities: responsibilities?.join(' ') || '',
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async ({
    projectId,
    start_date,
    end_date,
    responsibilities,
  }) => {
    const projectDto: AddCvProjectInput = {
      roles: [],
      cvId,
      projectId,
      start_date,
      responsibilities: [responsibilities || ''],
    }
    if (end_date) {
      projectDto['end_date'] = end_date
    }

    try {
      if (isCreating) {
        await addCVProject({
          variables: {
            project: {
              ...projectDto,
            },
          },
        })
        toast.success(t('Project was added'))
      } else {
        await updateCVProject({
          variables: {
            project: {
              ...projectDto,
            },
          },
        })
        toast.success(t('Project was updated'))
      }
      onClose()
    } catch (error) {
      toast.error((error as Error).message)
      console.error(error)
    }
  }

  return (
    <Backdrop
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
      onClick={onClose}
    >
      <Popover
        open={open}
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
        anchorEl={document.body}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            padding: '16px 24px',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          maxWidth="900px"
          width="100%"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
          >
            <Box component="span" fontWeight="500" fontSize="20px">
              {isCreating ? t('Add project') : t('Update project')}
            </Box>

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <SelectWrapper>
            <CustomSelectComponent
              disabled={!isCreating}
              value={selectedProject}
              onChange={(event: SelectChangeEvent<unknown>) => {
                clearErrors('projectId')
                onSelect(event.target.value as string)
                setValue('projectId', event.target.value as string)
              }}
              helpingText={errors.projectId?.message}
              label={t('Project')}
              options={projectsForSelect}
            />

            <TextField
              disabled
              value={t(pickedProject?.domain || '')}
              label={t('Domain')}
              placeholder={t('Education')}
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <FormControl fullWidth>
                <CustomDate
                  format="DD/MM/YYYY"
                  value={dayjs(watch('start_date'))}
                  onOpen={() => clearErrors('start_date')}
                  onChange={(value) => {
                    setValue('start_date', value?.toISOString() || '')
                  }}
                  label={t('Start Date')}
                />
                {errors.start_date?.message && (
                  <FormHelperText
                    sx={(theme) => ({
                      color: theme.palette.error.main,
                    })}
                  >
                    {t(errors.start_date.message)}
                  </FormHelperText>
                )}
              </FormControl>
              <CustomDate
                format="DD/MM/YYYY"
                value={dayjs(watch('end_date'))}
                onChange={(value) => {
                  setValue('end_date', value?.toISOString() || '')
                }}
                label={t('End Date')}
              />
            </LocalizationProvider>
          </SelectWrapper>
          <TextField
            disabled
            multiline
            value={t(pickedProject?.description || '')}
            autoComplete="off"
            sx={{
              margin: '16px 0',
              minHeight: '140px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {minHeight: '140px'},
              },
            }}
            label={t('Description')}
            placeholder={t('Description')}
          />
          <EnvSelect
            value={pickedProject?.environment || []}
            label={t('Environment')}
            placeholder={t('Environment')}
            sx={{margin: '16px 0'}}
          />
          <CustomTextField
            autoComplete="off"
            name="responsibilities"
            register={register}
            sx={{margin: '16px 0'}}
            label={t('Responsibilities')}
            placeholder={t('Responsibility')}
            type="text"
          />

          <Box display="flex" justifyContent="end" marginTop="16px">
            <StyledButton
              disabled={addingLoading || updatingLoading}
              onClick={onClose}
              variant="outlined"
              sx={{
                width: '220px',
                marginRight: '8px',
                height: '48px',
              }}
            >
              {t('Cancel')}
            </StyledButton>
            <StyledButton
              disabled={addingLoading || updatingLoading}
              type="submit"
              variant="contained"
              sx={{
                width: '220px',
                height: '48px',
              }}
            >
              {isCreating ? t('Add') : t('Update')}
            </StyledButton>
          </Box>
        </Box>
      </Popover>
    </Backdrop>
  )
}

export default ProjectHandlerPopup
