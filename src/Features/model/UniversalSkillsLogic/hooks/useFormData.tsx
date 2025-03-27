import {TransformedArray} from '@/Features'
import {Mastery} from 'cv-graphql'
import {useImmer} from 'use-immer'

const useFormData = (transformArray: TransformedArray[]) => {
  const [formData, setFormData] = useImmer({
    title: '',
    firstSelectValue: '',
    firstSelectTitle: 'Skill',
    secondSelectValue: '' as Mastery,
    secondSelectTitle: 'Skill mastery',
    firstSelectOptions: transformArray,
  })

  const handleOpenAdd = () => {
    setFormData((draft) => {
      draft.title = 'Add skill'
      draft.firstSelectValue = ''
      draft.secondSelectValue = Mastery.Novice
      draft.firstSelectOptions = transformArray
    })
  }

  const handleOpenEdit = (objData: TransformedArray, mastery: Mastery) => {
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
