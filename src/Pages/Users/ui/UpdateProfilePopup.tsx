import {FC, useEffect} from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {
  Popover,
  Backdrop,
  Box,
  IconButton,
  SelectChangeEvent,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

import {
  CustomSelectComponent,
  CustomTextField,
  LoaderBackdrop,
  StyledButton,
  useUser,
} from '@/Shared'
import {useDepartments, usePositions, useUpdateUserProfile} from '@/Features'
import {useTranslation} from 'react-i18next'
import {Navigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {FormWrapper, SelectmWrapper} from './preparedUi'

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
    (field: keyof FormFields) => (event: SelectChangeEvent<string>) => {
      setValue(field, event.target.value)
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
        <FormWrapper component="form" onSubmit={handleSubmit(onSubmit)}>
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
          <SelectmWrapper>
            <CustomTextField
              {...register('email')}
              type="email"
              id="Email"
              autoComplete="email"
              disabled
              label="Email"
              placeholder="Email"
            />
            <CustomTextField
              {...register('password')}
              type="password"
              id="password"
              autoComplete="password"
              disabled
              label="Password"
              placeholder="Password"
            />
            <CustomTextField
              {...register('firstName')}
              type="text"
              id="First Name"
              autoComplete="First Name"
              label="First Name"
              placeholder="First Name"
            />
            <CustomTextField
              {...register('lastName')}
              type="text"
              id="Last Name"
              autoComplete="Last Name"
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
          </SelectmWrapper>
          <Box display="flex" justifyContent="end" marginTop="16px">
            <StyledButton
              variant="outlined"
              onClick={() => {
                reset()
                onClose()
              }}
              loading={isFetching}
              sx={{
                width: '220px',
                marginRight: '8px',
                height: '48px',
              }}
            >
              {t('Cancel')}
            </StyledButton>
            <StyledButton
              type="submit"
              loading={isFetching}
              variant="contained"
              sx={{
                width: '220px',
                height: '48px',
              }}
            >
              {t('Update')}
            </StyledButton>
          </Box>
        </FormWrapper>
      </Popover>
    </Backdrop>
  )
}

export default UpdateProfilePopup
