import {LoaderBackdrop, StyledButton} from '@/Shared'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {InnerWrapper} from '../../ui/StyledComponents'
import {AllSkills, FormOver} from '@/Features'
import {getUser} from '@/App'
import {toast} from 'react-toastify'
import {useState} from 'react'
import {useAddUserSkill} from '../api/useAddUserSkill'
import useSkillsData from '../model/useSkillsData'
import {useDeleteUserSkill} from '../api/useDeleteSkill'
import {TransformedArray} from '@/Features/ui/FormOver/FormOver'
import {Mastery} from 'cv-graphql'
import {useUpdateUserSkill} from '../api/useUpdateSkills'
import {MasteryOptions} from '../utilits/MasteryOptions'
import useFormData from '../model/useFormData'

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

const SkillsPage = () => {
  const {t} = useTranslation()
  const user = getUser()
  const [openAdd, setOpen] = useState(false)

  const [mutateAddSkill, {data: AddSkillData, error: AddSkillError}] =
    useAddUserSkill()

  const [mutateDeleteSkill, {error: DeleteSkillError}] = useDeleteUserSkill()

  const [mutateUpdateSkill, {data: UpdateSkillData, error: UpdateSkillError}] =
    useUpdateUserSkill()

  const {
    error,
    groupedData,
    loading,
    transformedSkills,
    userSkillsData,
    refetch,
  } = useSkillsData(user.id)

  const handleDeleteSkill = async (arr: Set<string>) => {
    try {
      await mutateDeleteSkill({
        variables: {
          skill: {
            userId: user.id,
            name: [...arr],
          },
        },
      })
      toast.success('Skill was removed')
      await refetch()
    } catch {
      toast.error(DeleteSkillError?.message)
    }
  }

  const transformArray: TransformedArray[] = []
  transformedSkills.map((elem) => {
    transformArray.push({value: '0', label: elem.category})
    transformArray.push(...elem.technologies)
  })

  const handleAddSkill = async (skill: string, skillMaster: string) => {
    const techno = formData.firstSelectOptions.filter(
      (elem) => elem.label === skill
    )
    try {
      await mutateAddSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster as Mastery,
            userId: user.id,
            categoryId: techno[0].id,
          },
        },
      })
      handleClose()
      toast.success('Skill was added')
    } catch {
      toast.error(AddSkillError?.message)
    }
  }

  const handleUpdateSkill = async (skill: string, skillMaster: string) => {
    const techno = formData.firstSelectOptions.filter(
      (elem) => elem.label === skill
    )
    try {
      await mutateUpdateSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster as Mastery,
            userId: user.id,
            categoryId: techno[0].id,
          },
        },
      })
      handleClose()
      toast.success('Skill was updated')
    } catch {
      toast.error(UpdateSkillError?.message)
    }
  }

  const {formData, handleOpenAdd, handleOpenEdit} = useFormData(transformArray)

  const handleClose = () => {
    setOpen(false)
  }

  if (AddSkillData || UpdateSkillData) {
    void refetch()
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
          mutateFunc={
            formData.title.includes('Add') ? handleAddSkill : handleUpdateSkill
          }
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
          deleteFunc={handleDeleteSkill}
        />
      )}
    </InnerWrapper>
  )
}

export default SkillsPage
