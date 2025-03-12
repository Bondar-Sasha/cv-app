import {FC} from 'react'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import {useTranslation} from 'react-i18next'
import {EditBox, ResponsiveButtonBox, WrapperButton} from '@/Features'

interface LanguageButtonsProps {
  isEdit: boolean
  editCount: number
  onAdd: () => void
  onDelete: () => void
  onEdit: () => void
  onCancel: () => void
}

const LanguageButtons: FC<LanguageButtonsProps> = ({
  isEdit,
  editCount,
  onAdd,
  onDelete,
  onEdit,
  onCancel,
}) => {
  const {t} = useTranslation()

  return (
    <ResponsiveButtonBox>
      {isEdit ? (
        <>
          <WrapperButton variant="outlined" onClick={onCancel}>
            {t('Cancel')}
          </WrapperButton>
          <WrapperButton
            disabled={!editCount}
            variant="contained"
            onClick={onDelete}
          >
            {t('Delete')}
            {editCount > 0 && <EditBox>{editCount}</EditBox>}
          </WrapperButton>
        </>
      ) : (
        <>
          <WrapperButton onClick={onAdd}>
            <AddIcon style={{marginRight: '14px'}} /> {t('Add language')}
          </WrapperButton>
          <WrapperButton color="rgb(198, 48, 49)" onClick={onEdit}>
            <DeleteIcon style={{marginRight: '14px'}} />
            {t('Remove languages')}
          </WrapperButton>
        </>
      )}
    </ResponsiveButtonBox>
  )
}

export default LanguageButtons
