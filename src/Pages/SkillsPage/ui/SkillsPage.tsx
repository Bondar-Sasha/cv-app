import {UniversalSkillsLogic} from '@/Features'
import {getUser} from '@/App'
import {useDeleteUserSkill} from '../api/useDeleteSkill'
import {useAddUserSkill} from '../api/useAddUserSkill'
import {useUpdateUserSkill} from '../api/useUpdateSkills'
import {toast} from 'react-toastify'
import {Mastery} from 'cv-graphql'

const App = () => {
  const user = getUser()

  const [mutateAddSkill] = useAddUserSkill()
  const [mutateDeleteSkill] = useDeleteUserSkill()
  const [mutateUpdateSkill] = useUpdateUserSkill()

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
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  const handleAddSkill = async (
    skill: string,
    skillMaster: string,
    categoryId: string
  ) => {
    try {
      await mutateAddSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster as Mastery,
            userId: user.id,
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
      await mutateUpdateSkill({
        variables: {
          skill: {
            name: skill,
            mastery: skillMaster as Mastery,
            userId: user.id,
            categoryId: categoryId,
          },
        },
      })
      toast.success('Skill was updated')
    } catch (error) {
      toast.error((error as Error).message)
    }
  }

  return (
    <UniversalSkillsLogic
      userId={user.id}
      handleDeleteSkill={handleDeleteSkill}
      handleAddSkill={handleAddSkill}
      handleUpdateSkill={handleUpdateSkill}
    />
  )
}

export default App
