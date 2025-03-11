import {gql, useMutation} from '@apollo/client'
import type {DeleteProfileLanguageInput, Profile} from 'cv-graphql'

export type DeleteLanguagesArgs = {
  language: DeleteProfileLanguageInput
}

export type DeleteLanguageResult = {
  data: Profile
}

export const DELETE_USER_LANGUAGES = gql`
  mutation DeleteUserLanguages($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`

export const useDeleteUserLanguage = () => {
  return useMutation<DeleteLanguageResult, DeleteLanguagesArgs>(
    DELETE_USER_LANGUAGES
  )
}
