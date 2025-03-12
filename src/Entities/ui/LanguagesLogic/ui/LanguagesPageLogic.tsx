import {InnerWrapper} from '@/Pages/ui/StyledComponents'
import {LoaderBackdrop, StyledButton} from '@/Shared'
import AddIcon from '@mui/icons-material/Add'
import {FC, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {toast} from 'react-toastify'
import {useGetUserLanguages} from '../api/useGetUserLanguages'
import {useDeleteProfileLanguage} from '../api/useDeleteProfileLanguage'
import LanguageFormLogic from './LanguageFormLogic'
import {ExtraWrapper} from './StyledComponents'

import LanguagesList from './LanguagesList'
import LanguageButtons from './LanguageButtons'
import useEditLanguages from '../hooks/useEditLanguages'
import useLanguageForm from '../hooks/useLanguageForm'
import {getCurrentUserID} from '@/App'

export interface LanguageOption {
  label: string
  value: string
}

interface LanguagesPageLogicProps {
  userId: string
}

const LanguagesPageLogic: FC<LanguagesPageLogicProps> = ({userId}) => {
  const {t} = useTranslation()
  const currentUserId = getCurrentUserID()
  const [mutateDeleteLanguage] = useDeleteProfileLanguage()

  const {isEdit, edit, handleEdit, handleCancel, clickForEditDelete} =
    useEditLanguages()

  const {
    isOpenForm,
    updateLanguage,
    handleOpenForm,
    handleClose,
    clickForEditUpdate,
  } = useLanguageForm()

  const {
    loading: UserLanguagesLoading,
    error: UserLanguagesError,
    data: UserLanguagesData,
    refetch,
  } = useGetUserLanguages(userId)

  useEffect(() => {
    if (UserLanguagesError) {
      toast.error(UserLanguagesError.message)
    }
  }, [UserLanguagesError])

  if (UserLanguagesLoading) {
    return <LoaderBackdrop loading />
  }

  const handleDeleteLanguage = async () => {
    try {
      await mutateDeleteLanguage({
        variables: {
          language: {
            userId,
            name: [...edit],
          },
        },
      })
      await refetch()
      toast.success('Languages was removed')
      handleCancel()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  if (
    currentUserId !== userId &&
    UserLanguagesData?.user.profile.languages.length === 0
  ) {
    return null
  }

  return (
    <InnerWrapper>
      {isOpenForm && (
        <LanguageFormLogic
          handleClose={handleClose}
          updatedLanguage={updateLanguage}
          refetch={refetch}
          userLanguages={UserLanguagesData?.user.profile.languages}
        />
      )}

      {UserLanguagesData?.user.profile.languages.length === 0 ? (
        <StyledButton onClick={handleOpenForm}>
          <AddIcon style={{marginRight: '8px'}} /> {t('Add language')}
        </StyledButton>
      ) : (
        <ExtraWrapper>
          <LanguagesList
            languages={UserLanguagesData?.user.profile.languages}
            isEdit={isEdit}
            edit={edit}
            onEditUpdate={clickForEditUpdate}
            onEditDelete={clickForEditDelete}
            disabled={currentUserId !== userId}
          />
          {currentUserId === userId && (
            <LanguageButtons
              isEdit={isEdit}
              editCount={edit.length}
              onAdd={handleOpenForm}
              onDelete={() => void handleDeleteLanguage()}
              onEdit={handleEdit}
              onCancel={handleCancel}
            />
          )}
        </ExtraWrapper>
      )}
    </InnerWrapper>
  )
}

export default LanguagesPageLogic
