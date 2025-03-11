import {gql, useMutation} from '@apollo/client'
import type {AddProfileLanguageInput, Profile} from 'cv-graphql'

export type AddLanguagesArgs = {
  language: AddProfileLanguageInput
}

export type AddLanguageResult = {
  data: Profile
}

export const ADD_USER_LANGUAGES = gql`
  mutation AddUserLanguages($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`

export const useAddUserLanguage = () => {
  return useMutation<AddLanguageResult, AddLanguagesArgs>(ADD_USER_LANGUAGES)
}
