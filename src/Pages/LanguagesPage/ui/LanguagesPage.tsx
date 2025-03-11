import {InnerWrapper} from '@/Pages/ui/StyledComponents'
import {LoaderBackdrop, StyledButton} from '@/Shared'
import AddIcon from '@mui/icons-material/Add'
import {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {toast} from 'react-toastify'
import {useGetUserLanguages} from '../api/useGetUserLanguages'
import {getCurrentUserID} from '@/App'
import {LanguageProficiency} from 'cv-graphql'
import {Box} from '@mui/material'
import {
  EditBox,
  ResponsiveButtonBox,
} from '@/Features/ui/AllSkills/StyledComponents'
import WrapperButton from '@/Features/ui/AllSkills/WrapperButton'
import DeleteIcon from '@mui/icons-material/Delete'
import {useDeleteProfileLanguage} from '../api/useDeleteProfileLanguage'
import LanguageFormLogic from './LanguageFormLogic'
import {LanguageSpan, ProficiencySpan} from './StyledComponents'

export interface LanguageOption {
  label: string
  value: string
}

const LanguagesPage = () => {
  const {t} = useTranslation()
  const userId = getCurrentUserID()

  const [isOpenForm, setOpenForm] = useState(false)
  const [isEdit, setEdit] = useState(false)
  const [edit, setEditName] = useState<Array<string>>([])

  const [updateLanguage, setUpdateLanguage] =
    useState<LanguageProficiency | null>(null)

  const [mutateDeleteLanguage] = useDeleteProfileLanguage()

  const handleClose = () => {
    setOpenForm(false)
  }

  const {
    loading: UserLanguagesLoading,
    error: UserLanguagesError,
    data: UserLanguagesData,
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
      toast.success('Languages was removed')
      setEditName([])
      setEdit(false)
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleCancel = () => {
    setEditName([])
    setEdit(false)
  }

  const clickForEditDelete = (name: string) => {
    setEditName((prevArray: string[]) =>
      prevArray.includes(name)
        ? prevArray.filter((i) => i !== name)
        : [...prevArray, name]
    )
  }

  const clickForEditUpdate = (elem: LanguageProficiency) => {
    setUpdateLanguage(elem)
    setOpenForm(true)
  }

  return (
    <InnerWrapper>
      {isOpenForm && (
        <LanguageFormLogic
          handleClose={handleClose}
          updatedLanguage={updateLanguage}
        />
      )}

      {UserLanguagesData?.user.profile.languages.length === 0 ? (
        <StyledButton
          onClick={() => {
            setOpenForm(true)
          }}
        >
          <AddIcon style={{marginRight: '8px'}} /> {t('Add language')}
        </StyledButton>
      ) : (
        <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
          <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap'}}>
            {UserLanguagesData?.user.profile.languages.map((elem) => (
              <StyledButton
                onClick={() =>
                  isEdit
                    ? clickForEditDelete(elem.name)
                    : clickForEditUpdate(elem)
                }
                key={elem.name}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexBasis: '33%',
                  minWidth: '220px',
                  gap: '30px',
                  textTransform: 'initial',
                }}
                children={
                  <>
                    <ProficiencySpan>{elem.proficiency}</ProficiencySpan>
                    <LanguageSpan>{elem.name}</LanguageSpan>
                  </>
                }
              />
            ))}
          </Box>

          <ResponsiveButtonBox>
            {isEdit ? (
              <>
                <WrapperButton variant="outlined" onClick={handleCancel}>
                  {t('Cancel')}
                </WrapperButton>
                <WrapperButton
                  disabled={!edit.length}
                  variant="contained"
                  onClick={handleDeleteLanguage}
                >
                  {t('Delete')}
                  {edit.length > 0 && <EditBox>{edit.length}</EditBox>}
                </WrapperButton>
              </>
            ) : (
              <>
                <WrapperButton onClick={() => setOpenForm(true)}>
                  <AddIcon style={{marginRight: '14px'}} /> {t('Add language')}
                </WrapperButton>
                <WrapperButton
                  color="rgb(198, 48, 49)"
                  onClick={() => setEdit(true)}
                >
                  <DeleteIcon style={{marginRight: '14px'}} />
                  {t('Remove languages')}
                </WrapperButton>
              </>
            )}
          </ResponsiveButtonBox>
        </Box>
      )}
    </InnerWrapper>
  )
}

export default LanguagesPage
