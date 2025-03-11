import {TransformedSkill} from './addCategoryAndProficiencyToUserSkills'

interface Technology {
  name: string
}

interface GroupedData {
  technologies: Technology[]
}

export function removeTechnologyByName(
  transformedSkills: TransformedSkill[],
  groupedData: GroupedData[]
) {
  const groupedNames = groupedData.flatMap((group) =>
    group.technologies.map((tech: Technology) => tech.name)
  )

  return transformedSkills.map((categoryObj) => {
    return {
      ...categoryObj,
      technologies: categoryObj.technologies.filter(
        (tech) => !groupedNames.includes(tech.value)
      ),
    }
  })
}
