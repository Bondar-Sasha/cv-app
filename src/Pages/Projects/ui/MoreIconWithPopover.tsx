import {FC, useRef, useState} from 'react'
import {Button, IconButton, Popover, Box, useTheme} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {useTranslation} from 'react-i18next'

interface MoreIconWithPopoverProps {
  onDetails: () => void
}

const MoreIconWithPopover: FC<MoreIconWithPopoverProps> = ({onDetails}) => {
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
              onDetails()
              onClose()
            }}
          >
            {t('Project details')}
          </Button>

          <Button disabled color="inherit" onClick={onClose}>
            {t('Remove project')}
          </Button>
        </Box>
      </Popover>
    </div>
  )
}

export default MoreIconWithPopover
