import { Mastery, SkillMastery } from "cv-graphql"

export interface TransformedSkill {
  category: string
  technologies: Technology[]
}

interface Technology {
  value: string
  label: string
  id: string
  category: string
}

const proficiencyMap = {
  Novice: 20,
  Advanced: 40,
  Competent: 60,
  Proficient: 80,
  Expert: 100,
}

export interface UpdatedUserSkills {
  category: string
  proficiency: number
  name: string
  categoryId: string
  mastery: Mastery
}

export const addCategoryAndProficiencyToUserSkills = (
    userSkills : SkillMastery[],
    transformedSkills: TransformedSkill[]
  ): UpdatedUserSkills[]  => {
    return userSkills.map((skill) => {
      const matchingCategory = transformedSkills.find((categoryObj) =>
        categoryObj.technologies.some((tech) => tech.value === skill.name)
      )?.category

      return {
        ...skill,
        categoryId: skill.categoryId || '',
        category: matchingCategory || 'Unknown',
        proficiency: proficiencyMap[skill.mastery],
      }
    })
  }