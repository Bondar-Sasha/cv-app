import {UniversalSkillsLogic} from '@/Features'
import {useParams} from 'react-router-dom'
import {useAddCvSkill} from '../api/useAddCvSkill'
import {useDeleteCvSkill} from '../api/useDeleteCvSkill'
import {useUpdateCvSkill} from '../api/useUpdateCvSkill'
import {Mastery} from 'cv-graphql'
import {toast} from 'react-toastify'

const CvSkillsPage = () => {
  const {cvId} = useParams()
  const ID = cvId || ''

  const [mutateAddCvSkill] = useAddCvSkill()
  const [mutateDeleteCvSkill] = useDeleteCvSkill()
  const [mutateUpdateCvSkill] = useUpdateCvSkill()

  const handleAddCvSkill = async (
    skill: string,
    skillMaster: Mastery,
    categoryId: string
  ) => {
    try {
      await mutateAddCvSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster,
            cvId: ID,
            categoryId: categoryId,
          },
        },
      })
      toast.success('Skill was added')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleUpdateSkill = async (
    skill: string,
    skillMaster: Mastery,
    categoryId: string
  ) => {
    try {
      await mutateUpdateCvSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster,
            cvId: ID,
            categoryId: categoryId,
          },
        },
      })
      toast.success('Skill was updated')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleDeleteCvSkill = async (arr: Set<string>) => {
    try {
      await mutateDeleteCvSkill({
        variables: {
          skill: {
            cvId: ID,
            name: [...arr],
          },
        },
      })
      toast.success('Skill was removed')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <UniversalSkillsLogic
      forState="cv"
      userId={ID}
      handleDeleteSkill={handleDeleteCvSkill}
      handleAddSkill={handleAddCvSkill}
      handleUpdateSkill={handleUpdateSkill}
    />
  )
}

export default CvSkillsPage
