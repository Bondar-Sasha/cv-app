import {useEffect, useState} from 'react'
import {
  addCategoryAndProficiencyToUserSkills,
  TransformedSkill,
} from '../utilits/addCategoryAndProficiencyToUserSkills'
import {useGetSkillsCategories} from '../api/useGetSkillsCategories'
import {groupByCategory} from '../utilits/groupByCategory'
import {FiltersTechnologies} from '../UniversalSkillsLogic'
import {removeTechnologyByName} from '../utilits/removeTechnologyByName'
import {useGetSkills} from '@/Features'
import {transformSkills} from '../utilits/transformSkills'

const useSkillsData = (userId?: string) => {
  const [transformedSkills, setTransformedSkills] = useState<
    TransformedSkill[]
  >([])
  const [groupedData, setGroupedData] = useState<FiltersTechnologies[]>([])

  const {
    loading: AllSkillsLoading,
    error: AllSkillsError,
    data: AllSkillsData,
  } = useGetSkillsCategories()

  const {
    loading: userSkillsLoading,
    error: userSkillsError,
    data: userSkillsData,
    refetch,
  } = useGetSkills(userId)

  useEffect(() => {
    if (AllSkillsData && userSkillsData) {
      const transformed = transformSkills(AllSkillsData.skills)

      const updatedUserSkills = addCategoryAndProficiencyToUserSkills(
        userSkillsData.user.profile.skills,
        transformed
      )
      const datas = groupByCategory(updatedUserSkills)
      setGroupedData(datas)

      const clearObj = removeTechnologyByName(transformed, datas)
      setTransformedSkills(clearObj)
    }
  }, [AllSkillsData, userSkillsData])

  return {
    transformedSkills,
    groupedData,
    loading: AllSkillsLoading || userSkillsLoading,
    error: AllSkillsError || userSkillsError,
    userSkillsData: userSkillsData?.user.profile.skills,
    name: userSkillsData?.user.profile.full_name,
    refetch,
  }
}

export default useSkillsData
