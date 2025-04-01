import {TransformedArray} from '@/Features'
import {useImmer} from 'use-immer'
import {Mastery as MasteryCv} from 'cv-graphql'

enum Mastery {
  Novice = 'Novice',
  Advanced = 'Advanced',
  Competent = 'Competent',
  Proficient = 'Proficient',
  Expert = 'Expert',
}

type FormDataTypes = {
  title: string
  firstSelectValue: string
  firstSelectOptions: TransformedArray[]
  firstSelectTitle: string
  secondSelectValue: Mastery
  secondSelectOptions: {value: string; label: string}[]
  secondSelectTitle: string
}

const useFormData = (transformArray: TransformedArray[]) => {
  const [formData, setFormData] = useImmer<FormDataTypes>({
    title: '',
    firstSelectValue: '',
    firstSelectTitle: 'Skill',
    secondSelectValue: Mastery.Novice as MasteryCv.Novice,
    secondSelectTitle: 'Skill mastery',
    firstSelectOptions: transformArray,
    secondSelectOptions: [],
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
