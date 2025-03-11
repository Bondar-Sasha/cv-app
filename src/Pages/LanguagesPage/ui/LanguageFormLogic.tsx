import {FormOver} from '@/Features'
import {LanguageProficiency, Proficiency} from 'cv-graphql'
import {toast} from 'react-toastify'
import {useAddProfileLanguage} from '../api/useAddProfileLanguages'
import useFormLanguages from '../hooks/useFormLanguages'
import {languagesProficiency} from '../utilits/languagesProficiency'
import {FC, useEffect} from 'react'
import {getCurrentUserID} from '@/App'
import {useGetAllLanguages} from '../api/useGetAllLanguages'
import {useUpdateProfileLanguage} from '../api/useUpdateProfileLanguage'

interface LanguageFormLogicProps {
  handleClose: () => void
  updatedLanguage: LanguageProficiency | null
}

const LanguageFormLogic: FC<LanguageFormLogicProps> = ({
  handleClose,
  updatedLanguage,
}) => {
  const userId = getCurrentUserID()

  const [mutateAddLanguage] = useAddProfileLanguage()
  const [mutateUpdateLanguage] = useUpdateProfileLanguage()

  const {error: languagesError, languages: languagesData} = useGetAllLanguages()

  const {formData, handleOpenAddLanguage, handleOpenEditLanguage} =
    useFormLanguages(languagesData || [])

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
    handleOpenAddLanguage,
    handleOpenEditLanguage,
  ])

  const handleAddLanguage = async (name: string, proficiency: Proficiency) => {
    try {
      await mutateAddLanguage({
        variables: {
          language: {
            userId,
            name,
            proficiency,
          },
        },
      })
      toast.success('Language was added')
      handleClose()
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleUpdateLanguage = async (
    name: string,
    proficiency: Proficiency
  ) => {
    try {
      await mutateUpdateLanguage({
        variables: {
          language: {
            userId,
            name,
            proficiency,
          },
        },
      })
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
        secondSelectValue={formData.secondSelectValue}
        secondSelectOptions={languagesProficiency}
        secondSelectTitle={formData.secondSelectTitle}
      />
    )
  }
}

export default LanguageFormLogic
