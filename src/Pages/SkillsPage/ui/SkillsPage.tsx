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
  const [open, setOpen] = useState(false)

  const [
    mutateAddSkill,
    {data: AddSkillData, loading: AddSkillLoading, error: AddSkillError},
  ] = useAddUserSkill()

  const [
    mutateDeleteSkill,
    {loading: DeleteSkillLoading, error: DeleteSkillError},
  ] = useDeleteUserSkill()

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

  const handleAddSkill = async (
    transformArray: TransformedArray[],
    skill: string,
    skillMaster: string
  ) => {
    const techno = transformArray.filter((elem) => elem.label === skill)
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

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (AddSkillData) {
    void refetch()
  }

  if (error) {
    toast(error.message)
  }

  if (loading || DeleteSkillLoading || AddSkillLoading) {
    return <LoaderBackdrop loading />
  }

  return (
    <InnerWrapper>
      {open && (
        <FormOver
          dataForSelect={transformedSkills}
          onClose={handleClose}
          title="Add skill"
          addFunc={handleAddSkill}
        />
      )}

      {userSkillsData?.length === 0 ? (
        <StyledButton onClick={handleOpen}>
          <AddIcon style={{marginRight: '8px'}} /> {t('Add skill')}
        </StyledButton>
      ) : (
        <AllSkills
          formOpen={handleOpen}
          dataForSelect={transformedSkills}
          dataObject={groupedData}
          deleteFunc={handleDeleteSkill}
        />
      )}
    </InnerWrapper>
  )
}

export default SkillsPage
