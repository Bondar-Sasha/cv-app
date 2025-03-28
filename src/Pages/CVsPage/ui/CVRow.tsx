import React, {useRef, useState} from 'react'
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Popover,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {Cv} from 'cv-graphql'
import {useTranslation} from 'react-i18next'
import {AppRouterMap} from '@/Shared'
import {useNavigate} from 'react-router-dom'
import BackDropDelete from './BackDropDelete'

interface CVRowProps {
  cv: Cv
  employee: string
  refetch: () => void
}

const CVRow: React.FC<CVRowProps> = ({cv, employee, refetch}) => {
  const {t} = useTranslation()
  const navigate = useNavigate()
  const popoverAnchor = useRef<HTMLButtonElement | null>(null)
  const [isPopoverOpen, setPopoverOpen] = useState(false)
  const [isOpenDelete, setOpenDelete] = useState(false)

  return (
    <>
      <TableRow>
        <TableCell sx={{borderBottom: 'none'}}>
          <Typography variant="body2">{cv.name}</Typography>
        </TableCell>
        <TableCell sx={{borderBottom: 'none'}}>
          <Typography variant="body2">{cv.education}</Typography>
        </TableCell>
        <TableCell
          sx={{
            borderBottom: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="body2">{employee}</Typography>
          <IconButton ref={popoverAnchor} onClick={() => setPopoverOpen(true)}>
            <MoreVertIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell colSpan={3}>
          <Box>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.5,
              }}
            >
              {cv.description}
            </Typography>
          </Box>

          <BackDropDelete
            setOpen={setOpenDelete}
            isOpen={isOpenDelete}
            cvID={cv.id}
            cvName={cv.name}
            refetch={() => void refetch()}
          />
        </TableCell>
      </TableRow>

      <Popover
        anchorEl={popoverAnchor.current}
        open={isPopoverOpen}
        onClose={() => setPopoverOpen(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <List>
          <ListItemButton
            onClick={() => void navigate(AppRouterMap.CVDetails.path(cv.id))}
          >
            {t('Details')}
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              setOpenDelete(true)
              setPopoverOpen(false)
            }}
          >
            {t('Delete CV')}
          </ListItemButton>
        </List>
      </Popover>
    </>
  )
}

export default CVRow
