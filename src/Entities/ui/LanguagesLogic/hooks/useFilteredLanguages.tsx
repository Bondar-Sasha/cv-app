import {useMemo} from 'react'
import {LanguageProficiency} from 'cv-graphql'
import {LanguageOption} from '../ui/LanguagesPageLogic'

const useFilteredLanguages = (
  userLanguages: LanguageProficiency[] | undefined,
  arrLanguages: LanguageOption[]
) => {
  const valuesForUserLanguages = useMemo(() => {
    return userLanguages
      ?.filter((obj) => obj['name'] !== undefined)
      .map((obj) => obj['name'])
  }, [userLanguages])

  const filteredLanguages = useMemo(() => {
    return arrLanguages.filter((language) => {
      return !valuesForUserLanguages?.includes(language.value)
    })
  }, [arrLanguages, valuesForUserLanguages])

  return {filteredLanguages}
}

export default useFilteredLanguages
