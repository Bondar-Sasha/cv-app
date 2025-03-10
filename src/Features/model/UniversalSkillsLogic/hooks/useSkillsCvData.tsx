import {useCallback, useEffect, useState} from 'react'
import {
  addCategoryAndProficiencyToUserSkills,
  TransformedSkill,
} from '../utilits/addCategoryAndProficiencyToUserSkills'
import {useGetSkillsCategories} from '../api/useGetSkillsCategories'
import {groupByCategory} from '../utilits/groupByCategory'
import {Skill} from 'cv-graphql'
import {FiltersTechnologies} from '../UniversalSkillsLogic'
import {removeTechnologyByName} from '../utilits/removeTechnologyByName'
import {useGetCvSkills} from '../api/useGetCvSkills'

interface Technology {
  value: string
  label: string
  id: string
  category: string
}

interface CategoryObj {
  category: string
  technologies: Technology[]
  value: string
  label: string
  id: string
}

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

  const transformSkills = useCallback((skills: [Skill]): TransformedSkill[] => {
    const transformed = skills.reduce(
      (acc: Record<string, CategoryObj>, skill: Skill) => {
        const category = skill.category_parent_name || skill.category_name

        if (category && !acc[category]) {
          acc[category] = {
            category,
            technologies: [],
            value: skill.category?.id || '',
            label: category,
            id: skill.category?.id || '',
          }
        }

        if (category && skill.category && skill.category.id) {
          acc[category].technologies.push({
            value: skill.name,
            label: skill.name,
            id: skill.category.id,
            category: category,
          })
        }

        return acc
      },
      {}
    )
    return Object.values(transformed).map((categoryObj) => ({
      category: categoryObj.category,
      technologies: categoryObj.technologies,
    }))
  }, [])

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
  }
}

export default useSkillsCvData
