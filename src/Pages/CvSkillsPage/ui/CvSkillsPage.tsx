import {CvLayout, UniversalSkillsLogic} from '@/Features'
import {useParams} from 'react-router-dom'
import {useAddCvSkill} from '../api/useAddCvSkill'
import {useDeleteCvSkill} from '../api/useDeleteCvSkill'
import {useUpdateCvSkill} from '../api/useUpdateCvSkill'
import {Mastery} from 'cv-graphql'
import {toast} from 'react-toastify'

const CvSkillsPage = () => {
  const cvId = useParams().cvId || ''

  const [mutateAddCvSkill] = useAddCvSkill()
  const [mutateDeleteCvSkill] = useDeleteCvSkill()
  const [mutateUpdateCvSkill] = useUpdateCvSkill()

  const handleAddCvSkill = async (
    skill: string,
    skillMaster: string,
    categoryId: string
  ) => {
    try {
      await mutateAddCvSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster as Mastery,
            cvId: cvId,
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
    skillMaster: string,
    categoryId: string
  ) => {
    try {
      await mutateUpdateCvSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster as Mastery,
            cvId: cvId,
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
            cvId: cvId,
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
    <CvLayout
      path="skills"
      page={
        <UniversalSkillsLogic
          forState="cv"
          userId={cvId}
          handleDeleteSkill={handleDeleteCvSkill}
          handleAddSkill={handleAddCvSkill}
          handleUpdateSkill={handleUpdateSkill}
        />
      }
    />
  )
}

export default CvSkillsPage
