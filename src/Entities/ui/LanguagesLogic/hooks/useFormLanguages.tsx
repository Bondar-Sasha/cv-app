import {useState, useCallback} from 'react'
import {LanguageOption} from '../ui/LanguagesPageLogic'
import {LanguageProficiency} from 'cv-graphql'
import useFilteredLanguages from './useFilteredLanguages'

export interface FormDatas {
  title: string
  firstSelectValue: string
  firstSelectTitle: string
  secondSelectValue: string
  secondSelectTitle: string
  firstSelectOptions: LanguageOption[]
}

const useFormLanguages = (
  arrLanguages: LanguageOption[],
  userLanguages: LanguageProficiency[] | undefined
) => {
  const {filteredLanguages} = useFilteredLanguages(
    userLanguages,
    arrLanguages || []
  )

  const [formData, setFormData] = useState<FormDatas>({
    title: '',
    firstSelectValue: '',
    firstSelectTitle: 'Language',
    secondSelectValue: '',
    secondSelectTitle: 'Language proficiency',
    firstSelectOptions: arrLanguages,
  })

  const handleOpenAddLanguage = useCallback(() => {
    setFormData((prevData) => ({
      ...prevData,
      title: 'Add language',
      firstSelectValue: '',
      secondSelectValue: 'A1',
      firstSelectOptions: filteredLanguages,
    }))
  }, [filteredLanguages])

  const handleOpenEditLanguage = useCallback(
    (objData: LanguageOption, proficiency: string) => {
      setFormData((prevData) => ({
        ...prevData,
        title: 'Update language',
        firstSelectValue: objData.value,
        secondSelectValue: proficiency,
        firstSelectOptions: [...arrLanguages, objData],
      }))
    },
    [arrLanguages]
  )

  return {formData, handleOpenAddLanguage, handleOpenEditLanguage, setFormData}
}

export default useFormLanguages
