import {Skill} from 'cv-graphql'
import {TransformedSkill} from '../utilits/addCategoryAndProficiencyToUserSkills'

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

export const transformSkills = (skills: [Skill]): TransformedSkill[] => {
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
}
