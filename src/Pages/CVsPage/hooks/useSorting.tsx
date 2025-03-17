import {useState, useMemo} from 'react'

export type SortTypes = 'asc' | 'desc'

interface SortType {
  field: string
  direction: SortTypes
}

export const useSorting = <T extends Record<string, any>>(
  data: T[],
  defaultField: string
) => {
  const [sortState, setSortState] = useState<SortType>({
    field: defaultField,
    direction: 'asc',
  })

  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => {
      const aValue = (a[sortState.field] as string).toLowerCase()
      const bValue = (b[sortState.field] as string).toLowerCase()

      if (sortState.direction === 'asc') {
        return aValue.localeCompare(bValue)
      } else {
        return bValue.localeCompare(aValue)
      }
    })
  }, [data, sortState])

  const handleSort = (field: string) => {
    setSortState((prev) => ({
      field,
      direction:
        prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }))
  }

  return {sortedData, sortState, handleSort}
}
