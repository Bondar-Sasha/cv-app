import {TransformedArray} from '@/Features'
import {useImmer} from 'use-immer'

const useFormData = (transformArray: TransformedArray[]) => {
  const [formData, setFormData] = useImmer({
    title: '',
    firstSelectValue: '',
    firstSelectTitle: 'Skill',
    secondSelectValue: '',
    secondSelectTitle: 'Skill mastery',
    firstSelectOptions: transformArray,
  })

  const handleOpenAdd = () => {
    setFormData((draft) => {
      draft.title = 'Add skill'
      draft.firstSelectValue = ''
      draft.secondSelectValue = 'Novice'
      draft.firstSelectOptions = transformArray
    })
  }

  const handleOpenEdit = (objData: TransformedArray, mastery: string) => {
    setFormData((draft) => {
      draft.title = 'Update skill'
      draft.firstSelectValue = objData.value
      draft.secondSelectValue = mastery
      draft.firstSelectOptions = [...transformArray, objData]
    })
  }

  return {formData, handleOpenAdd, handleOpenEdit, setFormData}
}

export default useFormData
