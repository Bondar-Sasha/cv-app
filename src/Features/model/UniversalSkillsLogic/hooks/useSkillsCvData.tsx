import {useEffect, useState} from 'react'
import {
  addCategoryAndProficiencyToUserSkills,
  TransformedSkill,
} from '../utilits/addCategoryAndProficiencyToUserSkills'
import {useGetSkillsCategories} from '../api/useGetSkillsCategories'
import {groupByCategory} from '../utilits/groupByCategory'
import {FiltersTechnologies} from '../UniversalSkillsLogic'
import {removeTechnologyByName} from '../utilits/removeTechnologyByName'
import {useGetCvSkills} from '../api/useGetCvSkills'
import {transformSkills} from '../utilits/transformSkills'

const useSkillsCvData = (userId: string) => {
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
  } = useGetCvSkills(userId)

  useEffect(() => {
    if (AllSkillsData && userSkillsData) {
      const transformed = transformSkills(AllSkillsData.skills)

      const updatedUserSkills = addCategoryAndProficiencyToUserSkills(
        userSkillsData.cv.skills,
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
    userSkillsData: userSkillsData?.cv.skills,
    refetch,
    name: userSkillsData?.cv.name,
  }
}

export default useSkillsCvData
