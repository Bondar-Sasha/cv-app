import {LoaderBackdrop, StyledButton} from '@/Shared'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {InnerWrapper} from '@/Pages'
import {AllSkills, FormOver} from '@/Features'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import useSkillsData from './hooks/useSkillsData'
import {TransformedArray} from '@/Features'
import useFormData from './hooks/useFormData'
import {MasteryOptions} from './utilits/MasteryOptions'
import useSkillsCvData from './hooks/useSkillsCvData'
import {useBreadCrumbsContext} from '@/App'

interface Techno {
  category: string
  categoryId: string
  mastery: string
  name: string
  proficiency: number
}

export interface filterData {
  category: string
  technologies: [Techno]
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
  const breadcrumb = useBreadCrumbsContext()

  const useSkillsHook = forState === 'skills' ? useSkillsData : useSkillsCvData
  const {
    error,
    groupedData,
    loading,
    transformedSkills,
    userSkillsData,
    refetch,
    name,
  } = useSkillsHook(userId)

  const transformArray: TransformedArray[] = []
  transformedSkills.map((elem) => {
    transformArray.push({value: 'notSelect', label: elem.category})
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
    try {
      await handleAddSkill(skill, skillMaster, techno[0].id)
      handleClose()
      await refetch()
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (arr: Set<string>) => {
    try {
      await handleDeleteSkill(arr)
      await refetch()
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpdate = async (skill: string, skillMaster: string) => {
    const techno = formData.firstSelectOptions.filter(
      (elem) => elem.label === skill
    )
    if (!techno[0].id) {
      techno[0].id = ''
    }
    try {
      await handleUpdateSkill(skill, skillMaster, techno[0].id)
      handleClose()
      await refetch()
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    if (name) {
      breadcrumb.setCurrentBread(name)
    }
  }, [breadcrumb, name])

  useEffect(() => {
    if (error) {
      toast(error.message)
    }
  }, [error])

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
          <AddIcon sx={{marginRight: '8px'}} /> {t('Add skill')}
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
