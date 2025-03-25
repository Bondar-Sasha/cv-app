import {Cv} from 'cv-graphql'

interface Filters {
  searchState: string
  currentFilter: {
    id: 'name' | 'education'
    state: boolean
  }
}

export const filterFunc = (data?: Cv[] | null) => {
  return (curFilter: Filters['currentFilter']['id'], filterState: boolean) => {
    return (str: string): Cv[] | null | undefined => {
      if (!data || data.length === 0) return data

      return data
        .filter((cv) => (cv.name || '').includes(str))
        .sort((a, b) => {
          const aValue = a[curFilter]?.toLowerCase() || ''
          const bValue = b[curFilter]?.toLowerCase() || ''

          return filterState
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        })
    }
  }
}
