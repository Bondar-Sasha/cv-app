import {FormOver} from '@/Features'
import {LanguageProficiency, Mastery, Proficiency} from 'cv-graphql'
import {toast} from 'react-toastify'
import {useAddProfileLanguage} from '../api/useAddProfileLanguages'
import useFormLanguages from '../hooks/useFormLanguages'
import {languagesProficiency} from '../utilits/languagesProficiency'
import {FC, useEffect} from 'react'
import {getCurrentUserID} from '@/App'
import {useGetAllLanguages} from '../api/useGetAllLanguages'
import {useUpdateProfileLanguage} from '../api/useUpdateProfileLanguage'
import {ApolloQueryResult} from '@apollo/client'
import {LanguagesResult} from '../api/useGetUserLanguages'

interface LanguageFormLogicProps {
  handleClose: () => void
  updatedLanguage: LanguageProficiency | null
  refetch: () => Promise<ApolloQueryResult<LanguagesResult>>
  userLanguages?: LanguageProficiency[]
}

const LanguageFormLogic: FC<LanguageFormLogicProps> = ({
  handleClose,
  updatedLanguage,
  refetch,
  userLanguages,
}) => {
  const userId = getCurrentUserID()

  const [mutateAddLanguage] = useAddProfileLanguage()
  const [mutateUpdateLanguage] = useUpdateProfileLanguage()

  const {error: languagesError, languages: languagesData} = useGetAllLanguages()

  const {formData, handleOpenAddLanguage, handleOpenEditLanguage} =
    useFormLanguages(languagesData || [], userLanguages)

  useEffect(() => {
    if (updatedLanguage) {
      handleOpenEditLanguage(
        {label: updatedLanguage.name, value: updatedLanguage.name},
        updatedLanguage.proficiency
      )
    } else {
      handleOpenAddLanguage()
    }
  }, [
    updatedLanguage,
    languagesData,
    handleOpenEditLanguage,
    handleOpenAddLanguage,
  ])

  const handleAddLanguage = async (skill: string, skillMaster: string) => {
    try {
      await mutateAddLanguage({
        variables: {
          language: {
            userId,
            name: skill,
            proficiency: skillMaster as Proficiency,
          },
        },
      })
      await refetch()
      toast.success('Language was added')
      handleClose()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleUpdateLanguage = async (skill: string, skillMaster: string) => {
    try {
      await mutateUpdateLanguage({
        variables: {
          language: {
            userId,
            name: skill,
            proficiency: skillMaster as Proficiency,
          },
        },
      })
      await refetch()
      toast.success('Language was updated')
      handleClose()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  if (languagesError) {
    toast.error(languagesError.message)
    return null
  }

  if (formData.firstSelectOptions.length) {
    return (
      <FormOver
        onClose={handleClose}
        title={formData.title}
        mutateFunc={
          formData.title.includes('Add')
            ? handleAddLanguage
            : handleUpdateLanguage
        }
        firstSelectValue={formData.firstSelectValue}
        firstSelectOptions={formData.firstSelectOptions}
        firstSelectTitle={formData.firstSelectTitle}
        secondSelectValue={formData.secondSelectValue as Mastery}
        secondSelectOptions={languagesProficiency}
        secondSelectTitle={formData.secondSelectTitle}
      />
    )
  }
  return null
}

export default LanguageFormLogic
