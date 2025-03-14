import {gql, useMutation} from '@apollo/client'
import type {DeleteProfileLanguageInput, Profile} from 'cv-graphql'

export type DeleteLanguagesArgs = {
  language: DeleteProfileLanguageInput
}

export type DeleteLanguageResult = {
  data: Profile
}

export const DELETE_PROFILE_LANGUAGES = gql`
  mutation DeleteProfileLanguages($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`

export const useDeleteProfileLanguage = () => {
  return useMutation<DeleteLanguageResult, DeleteLanguagesArgs>(
    DELETE_PROFILE_LANGUAGES
  )
}
