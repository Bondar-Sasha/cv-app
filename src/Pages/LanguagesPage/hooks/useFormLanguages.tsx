import {useState, useCallback} from 'react'
import {LanguageOption} from '../ui/LanguagesPage'

const useFormLanguages = (arrLanguages: LanguageOption[]) => {
  const [formData, setFormData] = useState({
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
      firstSelectOptions: arrLanguages,
    }))
  }, [arrLanguages])

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
