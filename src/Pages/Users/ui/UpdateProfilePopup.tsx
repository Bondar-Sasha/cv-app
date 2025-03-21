import {FC, useEffect} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {
  Popover,
  Backdrop,
  Box,
  Button,
  IconButton,
  SelectChangeEvent,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import {
  CustomSelectComponent,
  CustomTextField,
  LoaderBackdrop,
  useUser,
} from '@/Shared'
import {useDepartments, usePositions, useUpdateUserProfile} from '@/Features'
import {useTranslation} from 'react-i18next'
import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'

interface UpdateProfilePopupProps {
  open: boolean
  onClose: () => void
}

interface FormFields {
  firstName: string
  lastName: string
  password: string
  email: string
  role: string
  department: string
  position: string
}

const UpdateProfilePopup: FC<UpdateProfilePopupProps> = ({open, onClose}) => {
  const {t} = useTranslation()
  const {update, isFetching} = useUpdateUserProfile()
  const {departments, departmentsFetching} = useDepartments()
  const {positions, positionsFetching} = usePositions()
  const {user, loading} = useUser()

  const {register, watch, setValue, handleSubmit, reset} = useForm<FormFields>()
  useEffect(() => {
    if (user) {
      reset({
        firstName: user.profile.first_name || '',
        lastName: user.profile.last_name || '',
        email: user.email || '',
        role: user.role || '',
        password: 'password',
        department: user.department?.id || '',
        position: user.position?.id || '',
      })
    }
  }, [user, reset])

  if (departmentsFetching || positionsFetching || loading) {
    return <LoaderBackdrop loading />
  }

  if (!departments || !positions) {
    return <Navigate to="/" />
  }

  const selectHandler =
    (field: keyof FormFields) => (event: SelectChangeEvent<unknown>) => {
      setValue(field, event.target.value as string)
    }

  const onSubmit: SubmitHandler<FormFields> = async ({
    lastName,
    firstName,
    department,
    position,
  }) => {
    if (!user?.id) return
    try {
      await update({
        last_name: lastName,
        first_name: firstName,
        departmentId: department,
        positionId: position,
        userId: user.id,
      })
      toast.success(t('Profile was updated'))
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="16px"
          >
            <Box component="span" fontWeight="500" fontSize="20px">
              {t('Update user')}
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
            gap="16px"
          >
            <CustomTextField
              type="email"
              id="Email"
              name="email"
              autoComplete="email"
              disabled
              register={register}
              label="Email"
              placeholder="Email"
            />
            <CustomTextField
              type="password"
              id="password"
              name="password"
              autoComplete="password"
              disabled
              register={register}
              label="Password"
              placeholder="Password"
            />
            <CustomTextField
              type="text"
              id="First Name"
              autoComplete="First Name"
              name="firstName"
              register={register}
              label="First Name"
              placeholder="First Name"
            />
            <CustomTextField
              type="text"
              id="Last Name"
              autoComplete="Last Name"
              name="lastName"
              register={register}
              label="Last Name"
              placeholder="Last Name"
            />

            <CustomSelectComponent
              value={watch('department')}
              onChange={selectHandler('department')}
              label="Department"
              options={departments.map(({name, id}) => ({
                value: id,
                label: name,
              }))}
            />

            <CustomSelectComponent
              value={watch('position')}
              onChange={selectHandler('position')}
              label="Position"
              options={positions.map(({name, id}) => ({
                value: id,
                label: name,
              }))}
            />

            <CustomSelectComponent
              value={watch('role')}
              onChange={selectHandler('role')}
              label="Role"
              disabled
              options={[
                {value: 'Admin', label: 'Admin'},
                {value: 'Employee', label: 'Employee'},
              ]}
            />
          </Box>
          <Box display="flex" justifyContent="end" marginTop="16px">
            <Button
              onClick={() => {
                reset()
                onClose()
              }}
              loading={isFetching}
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
              loading={isFetching}
              sx={{
                borderRadius: '24px',
                width: '220px',
                height: '48px',
                backgroundColor: 'rgb(198, 48, 49)',
                color: '#f5f5f7',
              }}
              variant="contained"
            >
              {t('Update')}
            </Button>
          </Box>
        </Box>
      </Popover>
    </Backdrop>
  )
}

export default UpdateProfilePopup
