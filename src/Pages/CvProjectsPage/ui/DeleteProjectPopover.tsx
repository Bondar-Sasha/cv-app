import {Backdrop, Box, Button, IconButton, Popover} from '@mui/material'
import {FC} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'
import {useDeleteCVProject} from '../api'

interface DeleteProjectPopoverProps {
  open: boolean
  onClose: () => void
  projectName: string
  projectId: string
  cvId: string
}

const DeleteProjectPopover: FC<DeleteProjectPopoverProps> = ({
  open,
  onClose,
  projectName,
  projectId,
  cvId,
}) => {
  const {t} = useTranslation()
  const [deleteProject, {loading}] = useDeleteCVProject()

  const handleDelete = async () => {
    await deleteProject({
      variables: {
        project: {cvId, projectId},
      },
    }).catch((error) => console.error(error))
    onClose()
  }
  return (
    <Backdrop
      sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={open}
      onClick={onClose}
    >
      <Popover
        anchorEl={document.body}
        open={open}
        onClose={onClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        sx={{'& .MuiPopover-paper': {padding: '16px', boxSizing: 'border-box'}}}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="16px"
        >
          <Box component="span" fontWeight="500" fontSize="20px">
            {t('Remove project')}
          </Box>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Box>
          <span>
            {t('Are you sure you want to remove project ')}
            <Box component="span" fontWeight="700">
              {projectName}
            </Box>
          </span>
        </Box>
        <Box display="flex" justifyContent="end" marginTop="16px">
          <Button
            disabled={loading}
            onClick={onClose}
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
            onClick={handleDelete}
            disabled={loading}
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
            {t('Delete')}
          </Button>
        </Box>
      </Popover>
    </Backdrop>
  )
}

export default DeleteProjectPopover
