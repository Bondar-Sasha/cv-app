import {useTranslation} from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import {createContext, FC, useState} from 'react'
import {EditBox, ResponsiveButtonBox} from './StyledComponents'
import SkillsPart from './SkillsPart'
import WrapperButton from './WrapperButton'
import {FormOver} from '@/Features'

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
  dataObject: SkillPart[]
}

interface EditContextProps {
  isEdit: boolean
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
  edit: Set<string>
  setEdit: React.Dispatch<React.SetStateAction<Set<string>>>
}

export const EditContext = createContext<EditContextProps | undefined>(
  undefined
)

const AllSkills: FC<AllSkillsProps> = ({dataObject}) => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false)

  const [edit, setEdit] = useState<Set<string>>(new Set())
  const [isEdit, setIsEdit] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDelete = () => {
    setIsEdit(!isEdit)
  }

  const handleCancel = () => {
    setIsEdit(!isEdit)
    setEdit(new Set())
  }

  return (
    <EditContext.Provider value={{edit, setEdit, isEdit, setIsEdit}}>
      {dataObject.map((elem) => (
        <SkillsPart key={elem.id} data={elem} />
      ))}
      {open && <FormOver onClose={handleClose} title="Add skill" />}

      <ResponsiveButtonBox>
        {isEdit ? (
          <>
            <WrapperButton variant="outlined" onClick={handleCancel}>
              {t('Cancel')}
            </WrapperButton>
            <WrapperButton disabled={!edit.size} variant="contained">
              {t('Delete')}
              {edit.size > 0 && <EditBox>{edit.size}</EditBox>}
            </WrapperButton>
          </>
        ) : (
          <>
            <WrapperButton onClick={handleOpen}>
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
