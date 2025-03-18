import {FC, useRef, useState} from 'react'
import {Button, IconButton, Popover, Box, useTheme} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useTranslation} from 'react-i18next'

interface MoreIconWithPopoverProps {
  onMoreClick: () => void
  onUpdate: () => void
  onDelete: () => void
}

const MoreIconWithPopover: FC<MoreIconWithPopoverProps> = ({
  onMoreClick,
  onDelete,
  onUpdate,
}) => {
  const anchorRef = useRef<HTMLButtonElement>(null)
  const {t} = useTranslation()
  const theme = useTheme()
  const [popoverState, setPopoverState] = useState(false)
  const onClose = () => {
    setPopoverState(false)
  }

  return (
    <div>
      <IconButton
        ref={anchorRef}
        onClick={() => {
          setPopoverState(true)
          onMoreClick()
        }}
      >
        <MoreVertIcon />
      </IconButton>
      <Popover
        anchorEl={anchorRef.current}
        open={popoverState}
        onClose={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Box
          width="200px"
          display="flex"
          flexDirection="column"
          color={theme.palette.text.primary}
          bgcolor={theme.palette.background.default}
        >
          <Button
            color="inherit"
            onClick={() => {
              onUpdate()
              onClose()
            }}
          >
            {t('Update project')}
          </Button>

          <Button
            color="inherit"
            onClick={() => {
              onDelete()
              onClose()
            }}
          >
            {t('Remove project')}
          </Button>
        </Box>
      </Popover>
    </div>
  )
}

export default MoreIconWithPopover
