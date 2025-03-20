import {CvProject, Project} from 'cv-graphql'
import {Filters} from '../TableForProjects'

export const filterFunc = (data: (CvProject | Project)[]) => {
  return (str: string) => {
    const filteredData = data.filter((project) =>
      project.name.toLowerCase().includes(str.toLowerCase())
    )

    return (
      curFilter: Filters['currentFilter']['id'],
      filterState: boolean
    ): (CvProject | Project)[] => {
      if (curFilter === 'end_date' || curFilter === 'start_date') {
        return filteredData.sort((a, b) => {
          const dateA = new Date(a[curFilter] || new Date()).getTime()
          const dateB = new Date(b[curFilter] || new Date()).getTime()
          return filterState ? dateA - dateB : dateB - dateA
        })
      }

      return filteredData.sort((a, b) => {
        const aValue = a[curFilter]
        const bValue = b[curFilter]

        const aStr = (aValue?.toString() || '').toLowerCase()
        const bStr = (bValue?.toString() || '').toLowerCase()
        return filterState ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr)
      })
    }
  }
}
