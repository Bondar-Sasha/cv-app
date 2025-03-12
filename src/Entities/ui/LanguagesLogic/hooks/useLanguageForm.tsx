import {useState, useCallback} from 'react'
import {LanguageProficiency} from 'cv-graphql'

const useLanguageForm = () => {
  const [isOpenForm, setOpenForm] = useState(false)
  const [updateLanguage, setUpdateLanguage] =
    useState<LanguageProficiency | null>(null)

  const handleOpenForm = useCallback(() => setOpenForm(true), [])

  const handleClose = useCallback(() => {
    setOpenForm(false)
    setUpdateLanguage(null)
  }, [])

  const clickForEditUpdate = useCallback((language: LanguageProficiency) => {
    setUpdateLanguage(language)
    setOpenForm(true)
  }, [])

  return {
    isOpenForm,
    updateLanguage,
    handleOpenForm,
    handleClose,
    clickForEditUpdate,
  }
}

export default useLanguageForm
