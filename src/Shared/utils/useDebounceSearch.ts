import {useState, useEffect, useTransition} from 'react'

export const useDebounceSearch = <T>(searchValue: T, delay = 300) => {
  const [debouncedSearchValue, setDebouncedSearchValue] =
    useState<T>(searchValue)
  const [, startTransition] = useTransition()

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedSearchValue(searchValue)
      })
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [searchValue, delay, startTransition])

  return debouncedSearchValue
}
