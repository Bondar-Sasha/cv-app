import {useState, useCallback} from 'react'

const useEditLanguages = () => {
  const [isEdit, setEdit] = useState(false)
  const [edit, setEditName] = useState<string[]>([])

  const handleEdit = useCallback(() => setEdit(true), [])

  const handleCancel = useCallback(() => {
    setEditName([])
    setEdit(false)
  }, [])

  const clickForEditDelete = useCallback((name: string) => {
    setEditName((prevArray: string[]) =>
      prevArray.includes(name)
        ? prevArray.filter((i) => i !== name)
        : [...prevArray, name]
    )
  }, [])

  return {
    isEdit,
    edit,
    handleEdit,
    handleCancel,
    clickForEditDelete,
  }
}

export default useEditLanguages
