import {gql, useMutation} from '@apollo/client'
import type {AddProfileLanguageInput, Profile} from 'cv-graphql'

export type AddLanguagesArgs = {
  language: AddProfileLanguageInput
}

export type AddLanguageResult = {
  data: Profile
}

export const ADD_PROFILE_LANGUAGES = gql`
  mutation AddProfileLanguages($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      languages {
        name
        proficiency
      }
    }
  }
`

export const useAddProfileLanguage = () => {
  return useMutation<AddLanguageResult, AddLanguagesArgs>(ADD_PROFILE_LANGUAGES)
}
