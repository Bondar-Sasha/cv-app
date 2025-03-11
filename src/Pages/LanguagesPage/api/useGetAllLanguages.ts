import {gql, useQuery} from '@apollo/client'
import {Language} from 'cv-graphql'
import {useEffect, useState} from 'react'
import {LanguageOption} from '../ui/LanguagesPage'

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
  const [languages, setLanguages] = useState<LanguageOption[]>([])

  useEffect(() => {
    if (data) {
      const transformArray: LanguageOption[] = data.languages.map(
        (elem: {name: string}) => ({
          label: elem.name,
          value: elem.name,
        })
      )
      setLanguages(transformArray)
    }
  }, [data])

  return {loading, error, languages}
}
