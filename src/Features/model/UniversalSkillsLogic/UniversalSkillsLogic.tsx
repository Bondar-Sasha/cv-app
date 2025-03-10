import {LoaderBackdrop, StyledButton} from '@/Shared'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {InnerWrapper} from '@/Pages'
import {AllSkills, FormOver} from '@/Features'
import {toast} from 'react-toastify'
import {useState} from 'react'
import useSkillsData from './hooks/useSkillsData'
import {TransformedArray} from '@/Features'
import useFormData from './hooks/useFormData'
import {MasteryOptions} from './utilits/MasteryOptions'
import useSkillsCvData from './hooks/useSkillsCvData'

interface techno {
  category: string
  categoryId: string
  mastery: string
  name: string
  proficiency: number
}

export interface filterData {
  category: string
  technologies: [techno]
}

export type FiltersTechnologies = filterData

interface UniversalSkillsPageProps {
  forState: 'cv' | 'skills'
  userId: string
  handleDeleteSkill: (arr: Set<string>) => Promise<void>
  handleAddSkill: (
    skill: string,
    skillMaster: string,
    categoryId: string
  ) => Promise<void>
  handleUpdateSkill: (
    skill: string,
    skillMaster: string,
    categoryId: string
  ) => Promise<void>
}

const UniversalSkillsLogic = ({
  forState,
  userId,
  handleDeleteSkill,
  handleAddSkill,
  handleUpdateSkill,
}: UniversalSkillsPageProps) => {
  const {t} = useTranslation()
  const [openAdd, setOpen] = useState(false)

  const skillsHook = forState === 'skills' ? useSkillsData : useSkillsCvData
  const {
    error,
    groupedData,
    loading,
    transformedSkills,
    userSkillsData,
    refetch,
  } = skillsHook(userId)

  const transformArray: TransformedArray[] = []
  transformedSkills.map((elem) => {
    transformArray.push({value: '0', label: elem.category})
    transformArray.push(...elem.technologies)
  })

  const {formData, handleOpenAdd, handleOpenEdit} = useFormData(transformArray)

  const handleClose = () => {
    setOpen(false)
  }

  const handleAdd = async (skill: string, skillMaster: string) => {
    const techno = formData.firstSelectOptions.filter(
      (elem) => elem.label === skill
    )
    if (!techno[0].id) {
      techno[0].id = ''
    }
    await handleAddSkill(skill, skillMaster, techno[0].id)
    handleClose()
    await refetch()
  }

  const handleDelete = async (arr: Set<string>) => {
    await handleDeleteSkill(arr)
    await refetch()
  }

  const handleUpdate = async (skill: string, skillMaster: string) => {
    const techno = formData.firstSelectOptions.filter(
      (elem) => elem.label === skill
    )
    if (!techno[0].id) {
      techno[0].id = ''
    }
    await handleUpdateSkill(skill, skillMaster, techno[0].id)
    handleClose()
    await refetch()
  }

  if (error) {
    toast(error.message)
  }

  if (loading) {
    return <LoaderBackdrop loading />
  }

  return (
    <InnerWrapper>
      {openAdd && (
        <FormOver
          onClose={handleClose}
          title={formData.title}
          mutateFunc={formData.title.includes('Add') ? handleAdd : handleUpdate}
          firstSelectValue={formData.firstSelectValue}
          firstSelectOptions={formData.firstSelectOptions}
          firstSelectTitle={formData.firstSelectTitle}
          secondSelectValue={formData.secondSelectValue}
          secondSelectOptions={MasteryOptions}
          secondSelectTitle={formData.secondSelectTitle}
        />
      )}

      {userSkillsData?.length === 0 ? (
        <StyledButton
          onClick={() => {
            handleOpenAdd()
            setOpen(true)
          }}
        >
          <AddIcon style={{marginRight: '8px'}} /> {t('Add skill')}
        </StyledButton>
      ) : (
        <AllSkills
          formOpenAdd={() => {
            handleOpenAdd()
            setOpen(true)
          }}
          formOpen={(objData, mastery) => {
            handleOpenEdit(objData, mastery)
            setOpen(true)
          }}
          dataForSelect={transformedSkills}
          dataObject={groupedData}
          deleteFunc={handleDelete}
        />
      )}
    </InnerWrapper>
  )
}

export default UniversalSkillsLogic
