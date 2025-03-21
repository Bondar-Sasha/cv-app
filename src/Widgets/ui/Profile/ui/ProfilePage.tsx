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
  useTheme,
} from '@mui/material'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate, useParams} from 'react-router-dom'
import CloseIcon from '@mui/icons-material/Close'

import {useDepartments, usePositions, useUpdateUserProfile} from '@/Features'
import {
  CustomSelectComponent,
  CustomTextField,
  EnvUserLogo,
  LoaderBackdrop,
  Params,
  useUser,
} from '@/Shared'
import UploadLogo from './UploadLogo'
import {useUploadAvatar} from '../api/useUploadAvatar'
import {useDeleteAvatar} from '../api/useDeleteAvatar'
import {toast} from 'react-toastify'
import {useTranslation} from 'react-i18next'

interface FormFields {
  firstName: string
  lastName: string
  department: string
  position: string
}

const ProfilePage: FC = () => {
  const params = useParams<Params>()
  const theme = useTheme()
  const navigate = useNavigate()
  const {t} = useTranslation()

  const {update, isFetching} = useUpdateUserProfile()
  const {user: currentUser, loading: currentUserFetching} = useUser()

  const {user, loading, error} = useUser(params.userId)

  const [logoUrl, setLogoUrl] = useState<string | null | undefined>(
    user?.profile.avatar
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
            base64,
            userId: user?.id || '',
            size: file.size,
            type: file.type,
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
        variables: {userId: user?.id || ''},
      }).catch((error) => console.error(error))
      setLogoUrl(null)
    }
    void deleteAvatarHelper()
  }

  const {register, watch, setValue, handleSubmit} = useForm<FormFields>()

  useEffect(() => {
    if (error) {
      void navigate('/')
      toast.error("This user doesn't exist")
      return
    }
  }, [error, navigate])

  if (
    departmentsFetching ||
    positionsFetching ||
    loading ||
    currentUserFetching
  ) {
    return <LoaderBackdrop loading />
  }

  if (!departments || !positions) {
    return <div>{t('Something went wrong')}</div>
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

  const isEqual = user?.id === currentUser?.id
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
        justifyContent="center"
        flexWrap="wrap"
        width="100%"
        maxWidth="fit-content"
        marginBottom="50px"
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
        {isEqual && (
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            marginLeft="60px"
          >
            <Box component="h3" textAlign="center" margin={0}>
              <IconButton onClick={handleIconClick} sx={{marginRight: '8px'}}>
                <UploadLogo color={theme.palette.text.primary} />
              </IconButton>
              <>{t('Upload avatar image')}</>
            </Box>
            <Box component="span" color="rgb(189, 189, 189)">
              {t('png, jpg or gif no more than 0.5MB')}
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
        <Box component="span">
          {t(`A member since`)}
          {` ${preparedDate}`}
        </Box>
      </Box>

      <Box
        component="form"
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
          gap="30px"
        >
          <CustomTextField
            type="text"
            id="First Name"
            name="First Name"
            label="First Name"
            placeholder="First Name"
            autoComplete="First Name"
            register={register}
            disabled={!isEqual}
            defaultValue={user?.profile.first_name ?? undefined}
          />
          <CustomTextField
            type="text"
            id="Last Name"
            name="Last Name"
            label="Last Name"
            placeholder="Last Name"
            autoComplete="Last Name"
            register={register}
            disabled={!isEqual}
            defaultValue={user?.profile.last_name ?? undefined}
          />
          <CustomSelectComponent
            disabled={!isEqual}
            defaultValue={user?.department?.id || ''}
            value={watch('department')}
            onChange={selectHandler('department')}
            label="Department"
            options={departments.map(({name, id}) => ({
              value: id,
              label: name,
            }))}
          />
          <CustomSelectComponent
            disabled={!isEqual}
            defaultValue={user?.position?.id || ''}
            value={watch('position')}
            onChange={selectHandler('position')}
            label="Position"
            options={positions.map(({name, id}) => ({
              value: id,
              label: name,
            }))}
          />
        </Box>
        {isEqual && (
          <Box display="flex" justifyContent="end" paddingTop="15px">
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
              {t('Update')}
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default ProfilePage
