import {FiltersTechnologies} from '../UniversalSkillsLogic'
import {UpdatedUserSkills} from './addCategoryAndProficiencyToUserSkills'

export const groupByCategory = (
  skills: UpdatedUserSkills[]
): FiltersTechnologies[] => {
  const grouped = skills.reduce((acc: FiltersTechnologies[], skill) => {
    const categoryIndex = acc.findIndex(
      (item) => item.category === skill.category
    )
    if (categoryIndex === -1) {
      acc.push({
        category: skill.category,
        technologies: [skill],
      })
    } else {
      acc[categoryIndex].technologies.push(skill)
    }
    return acc
  }, [])
  return grouped
}
