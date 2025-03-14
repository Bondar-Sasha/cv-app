import {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  useEffect,
  useRef,
  useState,
} from 'react'
import {
  Box,
  Button,
  IconButton,
  SelectChangeEvent,
  TextField,
  useTheme,
} from '@mui/material'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

import {useDepartments, usePositions, useUpdateUserProfile} from '@/Features'
import {
  CustomSelectComponent,
  EnvUserLogo,
  LoaderBackdrop,
  Params,
  useUser,
} from '@/Shared'
import UploadLogo from './UploadLogo'
import {useUploadAvatar} from '../api/useUploadAvatar'
import {useDeleteAvatar} from '../api/useDeleteAvatar'
import {toast} from 'react-toastify'

interface FormFields {
  firstName: string
  lastName: string
  department: string
  position: string
}

const ProfilePage: FC = () => {
  const params = useParams<Params>()
  const {update, isFetching} = useUpdateUserProfile()
  const navigate = useNavigate()

  const {user, loading} = useUser()
  const {
    user: paramUser,
    loading: paramsUserFetching,
    error,
  } = useUser(params.userId)

  const theme = useTheme()
  const [logoUrl, setLogoUrl] = useState<string | null | undefined>(
    user?.profile?.avatar
  )
  const {uploadAvatar, uploadFetching, uploadData} = useUploadAvatar()
  const {deleteAvatar, deleteFetching} = useDeleteAvatar()
  const {departments, departmentsFetching} = useDepartments()
  const {positions, positionsFetching} = usePositions()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleIconClick = () => {
    fileInputRef.current?.click()
  }
  const uploadPreparedAvatar = (file: File) => {
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64 = reader.result as string
      try {
        await uploadAvatar({
          variables: {
            avatar: {
              base64,
              userId: user?.id || '',
              size: file.size,
              type: file.type,
            },
          },
        })
        setLogoUrl(uploadData)
      } catch (error) {
        console.error(error)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      void uploadPreparedAvatar(file)
    }
  }
  const handleFileDrop: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      void uploadPreparedAvatar(file)
    }
  }
  const handleDeleteAvatar = () => {
    const deleteAvatarHelper = async () => {
      await deleteAvatar({
        variables: {avatar: {userId: user?.id || ''}},
      }).catch((error) => console.error(error))
      setLogoUrl(null)
    }
    void deleteAvatarHelper()
  }

  const {register, watch, setValue, handleSubmit, reset} = useForm<FormFields>({
    defaultValues: {
      firstName: '',
      lastName: '',
      department: '',
      position: '',
    },
  })

  const isIdEqual = user?.id === paramUser?.id
  useEffect(() => {
    if (error) {
      void navigate('/')
      toast.error("This user doesn't exist")
      return
    }
    const desiredUser = isIdEqual ? user : paramUser
    if (desiredUser) {
      reset({
        firstName: desiredUser.profile.first_name || '',
        lastName: desiredUser.profile.last_name || '',
        department: desiredUser.department?.id || '',
        position: desiredUser.position?.id || '',
      })
    }
  }, [error, isIdEqual, navigate, paramUser, reset, user])

  const wholeLoading =
    departmentsFetching || positionsFetching || loading || paramsUserFetching

  if (wholeLoading) {
    return <LoaderBackdrop loading={wholeLoading} />
  }

  if (!departments || !positions) {
    return <div>Something went wrong</div>
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
    await update({
      last_name: lastName,
      first_name: firstName,
      departmentId: department,
      positionId: position,
      userId: user?.id || '',
    }).catch((error) => console.error(error))
  }

  const preparedDate = new Date(Number(user?.profile.created_at)).toDateString()
  return (
    <Box
      component="main"
      width="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
        maxWidth="450px"
        width="100%"
        marginBottom="32px"
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            justifyContent: 'center',
          },
        }}
      >
        <Box
          position="relative"
          alignContent="center"
          width="120px"
          height="120px"
          onDragOver={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          onDrop={handleFileDrop}
        >
          <Box
            component="input"
            display="none"
            id="avatar"
            type="file"
            accept="image/png, image/jpeg"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple={false}
          />
          {logoUrl && (
            <IconButton
              onClick={handleDeleteAvatar}
              sx={{position: 'absolute', top: '-15px', right: '-20px'}}
            >
              <CloseIcon />
            </IconButton>
          )}
          <Box component="label" htmlFor="avatar" sx={{cursor: 'pointer'}}>
            {uploadFetching || deleteFetching ? (
              <LoaderBackdrop loading={uploadFetching || deleteFetching} />
            ) : (
              <EnvUserLogo
                latter={
                  user?.profile.first_name?.charAt(0) || user?.email[0] || ''
                }
                src={logoUrl}
                height={120}
                width={120}
              />
            )}
          </Box>
        </Box>
        {isIdEqual && (
          <Box display="flex" alignItems="center" flexDirection="column">
            <Box component="h3" textAlign="center" margin={0}>
              <IconButton onClick={handleIconClick} sx={{marginRight: '8px'}}>
                <UploadLogo color={theme.palette.text.primary} />
              </IconButton>
              <>Upload avatar image</>
            </Box>
            <Box component="span" color="rgb(189, 189, 189)">
              png, jpg or gif no more than 0.5MB
            </Box>
          </Box>
        )}
      </Box>

      <Box display="flex" flexDirection="column" alignItems="center">
        {user?.profile.full_name && (
          <Box component="h3" margin={0} marginBottom="8px">
            {user.profile.full_name}
          </Box>
        )}
        <Box component="span" color="rgb(189, 189, 189)" marginBottom="3px">
          {user?.email}
        </Box>
        <Box component="span">{`A member since ${preparedDate}`}</Box>
      </Box>

      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(onSubmit)}
        width="100%"
        sx={{marginTop: '32px'}}
      >
        <Box
          width="100%"
          margin="16px 0"
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(auto, 1fr))"
          sx={{
            '@media (min-width: 1100px)': {
              gridTemplateColumns: 'repeat(2, minmax(auto, auto))',
            },
          }}
          gap="16px"
        >
          <TextField
            disabled={!isIdEqual}
            {...register('firstName')}
            label="First Name"
            placeholder="First Name"
            variant="outlined"
          />
          <TextField
            disabled={!isIdEqual}
            {...register('lastName')}
            label="Last Name"
            placeholder="Last Name"
            variant="outlined"
          />
          <CustomSelectComponent
            disabled={!isIdEqual}
            value={watch('department')}
            onChange={selectHandler('department')}
            label="Department"
            options={departments.map(({name, id}) => ({
              value: id,
              label: name,
            }))}
          />
          <CustomSelectComponent
            disabled={!isIdEqual}
            value={watch('position')}
            onChange={selectHandler('position')}
            label="Position"
            options={positions.map(({name, id}) => ({
              value: id,
              label: name,
            }))}
          />
        </Box>
        {isIdEqual && (
          <Box display="flex" justifyContent="end">
            <Button
              type="submit"
              disabled={isFetching}
              loading={isFetching}
              sx={{
                borderRadius: '24px',
                width: '100%',
                maxWidth: '410px',
                height: '48px',
                backgroundColor: 'rgb(198, 48, 49)',
                color: '#f5f5f7',
              }}
              variant="contained"
            >
              Update
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ProfilePage
