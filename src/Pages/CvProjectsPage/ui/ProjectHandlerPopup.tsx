import {FC} from 'react'
import {
  Popover,
  Backdrop,
  Box,
  Button,
  TextField,
  IconButton,
  SelectChangeEvent,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import CloseIcon from '@mui/icons-material/Close'
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider'
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import {DatePicker} from '@mui/x-date-pickers/DatePicker'

import {CustomSelectComponent} from '@/Shared'
import EnvSelect from './EnvSelect'
import dayjs from 'dayjs'

interface ProjectHandlerPopupProps {
  cvId: string
  projectId: string
  start_date?: string
  end_date?: string
  responsibilities?: string[]
  isCreating: boolean
  open: boolean
  description: string
  environment: string[]
  domain: string
  selectProjectId: string
  selectOptions: string
  onSelectProjectChange: (event: SelectChangeEvent<unknown>) => void
  onClose: () => void
}

const ProjectHandlerPopup: FC<ProjectHandlerPopupProps> = ({
  open,
  onClose,
  isCreating,

  domain,
  description,
  environment,
  start_date,
  end_date,
  responsibilities,
  selectProjectId,
  onSelectProjectChange,
}) => {
  const {t} = useTranslation()
  return (
    <Backdrop
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
      onClick={onClose}
    >
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={document.body}
        onClick={(event) => event.stopPropagation()}
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
          <Box
            margin="16px 0"
            display="grid"
            gridTemplateColumns="repeat(auto-fit, minmax(auto, 1fr))"
            sx={{
              '@media (min-width: 900px)': {
                gridTemplateColumns: 'repeat(2, minmax(auto, 410px))',
              },
            }}
            gap="30px"
          >
            <CustomSelectComponent
              disabled={!isCreating}
              defaultValue={selectProjectId}
              value={selectProjectId}
              onChange={onSelectProjectChange}
              label={t('Project')}
              options={[]}
            />

            <TextField
              disabled
              value={t(domain)}
              label={t('Domain')}
              placeholder={t('Education')}
              variant="outlined"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Start Date" defaultValue={dayjs(start_date)} />
              <DatePicker label="End Date" defaultValue={dayjs(end_date)} />
            </LocalizationProvider>
          </Box>
          <TextField
            disabled
            value={description}
            sx={{
              margin: '16px 0',
              minHeight: '140px',
              '& .MuiOutlinedInput-root': {
                '& fieldset': {minHeight: '140px'},
              },
            }}
            label={t('Description')}
            placeholder={t('Description')}
            variant="outlined"
          />
          <EnvSelect
            value={[]}
            defaultValue={environment}
            label={t('Environment')}
            placeholder={t('Environment')}
            sx={{margin: '16px 0'}}
          />
          <TextField
            sx={{margin: '16px 0'}}
            label={t('Responsibility')}
            placeholder={t('Responsibility')}
            defaultValue={t(responsibilities?.join(' ') || '')}
            variant="outlined"
          />

          <Box display="flex" justifyContent="end" marginTop="16px">
            <Button
              sx={(theme) => ({
                borderRadius: '24px',
                width: '220px',
                height: '48px',
                borderColor: theme.palette.text.primary,
                color: theme.palette.text.primary,
                marginRight: '8px',
              })}
              variant="outlined"
            >
              {t('Cancel')}
            </Button>
            <Button
              type="submit"
              sx={{
                borderRadius: '24px',
                width: '220px',
                height: '48px',
                backgroundColor: 'rgb(198, 48, 49)',
                color: '#f5f5f7',
              }}
              variant="contained"
            >
              {isCreating ? t('Add') : t('Update')}
            </Button>
          </Box>
        </Box>
      </Popover>
    </Backdrop>
  )
}

export default ProjectHandlerPopup
