import {Backdrop, Box, IconButton, Popover} from '@mui/material'
import {FC} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'
import {useDeleteCVProject} from '../api'
import {toast} from 'react-toastify'
import {useParams} from 'react-router-dom'
import {Params, StyledButton} from '@/Shared'

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
  const params = useParams<Params>()

  const {t} = useTranslation()
  const [deleteProject, {loading}] = useDeleteCVProject(params.cvId)

  const handleDelete = async () => {
    try {
      await deleteProject({
        variables: {
          project: {cvId, projectId},
        },
      })
      toast.success(t('Project was removed'))
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
            {t('Are you sure you want to remove project')}
            <Box component="span" fontWeight="700">
              {` ${projectName}`}
            </Box>
          </span>
        </Box>
        <Box display="flex" justifyContent="end" marginTop="16px">
          <StyledButton
            disabled={loading}
            onClick={onClose}
            variant="outlined"
            sx={{
              marginRight: '8px',
              height: '48px',
            }}
          >
            {t('Cancel')}
          </StyledButton>
          <StyledButton
            variant="contained"
            onClick={handleDelete}
            disabled={loading}
            type="submit"
            sx={{
              height: '48px',
            }}
          >
            {t('Delete')}
          </StyledButton>
        </Box>
      </Popover>
    </Backdrop>
  )
}

export default DeleteProjectPopover
