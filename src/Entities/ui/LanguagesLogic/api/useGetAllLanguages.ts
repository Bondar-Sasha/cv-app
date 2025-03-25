import {gql, useQuery} from '@apollo/client'
import {Language} from 'cv-graphql'
import {useMemo} from 'react'

export type AllLanguagesResult = {
  languages: [Language]
}

export const GET_ALL_LANGUAGES = gql`
  query GetAllLanguages {
    languages {
      name
      native_name
    }
  }
`

export const useGetAllLanguages = () => {
  const {loading, error, data} = useQuery<AllLanguagesResult>(GET_ALL_LANGUAGES)

  const languages = useMemo(() => {
    if (!data) {
      return []
    }
    return data.languages.map((elem: {name: string}) => ({
      label: elem.name,
      value: elem.name,
    }))
  }, [data])

  return {loading, error, languages}
}
