import {gql, useMutation} from '@apollo/client'
import type {Profile, UpdateProfileLanguageInput} from 'cv-graphql'

export type UpdateLanguagesArgs = {
  language: UpdateProfileLanguageInput
}

export type UpdateLanguageResult = {
  data: Profile
}

export const UPDATE_USER_LANGUAGES = gql`
  mutation UpdateUserLanguages($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`

export const useUpdateProfileLanguage = () => {
  return useMutation<UpdateLanguageResult, UpdateLanguagesArgs>(
    UPDATE_USER_LANGUAGES
  )
}
