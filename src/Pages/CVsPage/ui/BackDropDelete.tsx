import {CloseButton, Form, FormBox, Title} from '@/Shared'
import {Backdrop, Box} from '@mui/material'
import {FC, useCallback, useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import {useTranslation} from 'react-i18next'
import CVsFormButton from './CVsFormButton'
import {TypographyCustom} from './StyledComponents'
import {useDeleteCv} from '../api/useDeleteCv'
import {toast} from 'react-toastify'

interface BackdropDeleteProps {
  setOpen: (open: boolean) => void
  isOpen: boolean
  cvID: string
  cvName: string
  refetch: () => void
}

const BackDropDelete: FC<BackdropDeleteProps> = ({
  setOpen,
  isOpen,
  cvID,
  cvName,
  refetch,
}) => {
  const {t} = useTranslation()
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const [mutateDelete, {data, error}] = useDeleteCv(cvID)

  useEffect(() => {
    if (data) {
      toast('CV was deleted')
      handleClose()
      refetch()
    }
    if (error) {
      toast(error.message)
    }
  }, [data, error, handleClose, refetch])

  return (
    <Backdrop
      sx={(theme) => ({
        color: 'rgba(0, 0, 0, 0.5)',
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isOpen}
      onClick={handleClose}
    >
      <FormBox
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <Form>
          <CloseButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </CloseButton>
          <Title variant="h2">{t('Delete CV')}</Title>

          <Box>
            <TypographyCustom variant="body1">
              {t('Are you sure you want to delete CV')}
            </TypographyCustom>

            <TypographyCustom variant="body1">{cvName}</TypographyCustom>
          </Box>

          <CVsFormButton
            handleClose={handleClose}
            isDisabled={false}
            titleBtn="Confirm"
            mutate={mutateDelete}
          />
        </Form>
      </FormBox>
    </Backdrop>
  )
}

export default BackDropDelete
