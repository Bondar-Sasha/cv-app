import {useTranslation} from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {createContext, FC, useState} from 'react'
import {EditBox, ResponsiveButtonBox} from './StyledComponents'
import SkillsPart from './SkillsPart'
import WrapperButton from './WrapperButton'
import {filterData} from '@/Features/model'
import {TransformedArray} from '../FormOver/FormOver'

export interface Skill {
  name: string
  size: number
}

export interface SkillPart {
  id: number
  part: string
  elements: Skill[]
}

export interface AllSkillsProps {
  dataObject: filterData[]
  dataForSelect: Array<unknown>
  formOpen: (objData: TransformedArray, mastery: string) => void
  formOpenAdd: () => void
  deleteFunc: (edit: Set<string>) => void
}

interface EditContextProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  edit: Set<string>
  setEdit: React.Dispatch<React.SetStateAction<Set<string>>>
  formOpen: (objData: TransformedArray, mastery: string) => void
}

export const EditContext = createContext<EditContextProps | undefined>(
  undefined
)

const AllSkills: FC<AllSkillsProps> = ({
  dataObject,
  formOpen,
  formOpenAdd,
  deleteFunc,
}) => {
  const {t} = useTranslation()
  const [edit, setEdit] = useState<Set<string>>(new Set())
  const [isEdit, setIsEdit] = useState(false)

  const handleDelete = () => {
    setIsEdit(!isEdit)
  }

  const handleCancel = () => {
    setIsEdit(!isEdit)
    setEdit(new Set())
  }

  const handleDeleteSkills = () => {
    deleteFunc(edit)
    handleCancel()
  }

  return (
    <EditContext.Provider value={{edit, setEdit, isEdit, setIsEdit, formOpen}}>
      {dataObject.map((elem) => (
        <SkillsPart key={elem.category} data={elem} />
      ))}

      <ResponsiveButtonBox>
        {isEdit ? (
          <>
            <WrapperButton variant="outlined" onClick={handleCancel}>
              {t('Cancel')}
            </WrapperButton>
            <WrapperButton
              disabled={!edit.size}
              variant="contained"
              onClick={handleDeleteSkills}
            >
              {t('Delete')}
              {edit.size > 0 && <EditBox>{edit.size}</EditBox>}
            </WrapperButton>
          </>
        ) : (
          <>
            <WrapperButton onClick={formOpenAdd}>
              <AddIcon style={{marginRight: '14px'}} /> {t('Add skill')}
            </WrapperButton>
            <WrapperButton color="rgb(198, 48, 49)" onClick={handleDelete}>
              <DeleteIcon style={{marginRight: '14px'}} /> {t('Remove skills')}
            </WrapperButton>
          </>
        )}
      </ResponsiveButtonBox>
    </EditContext.Provider>
  )
}

export default AllSkills
