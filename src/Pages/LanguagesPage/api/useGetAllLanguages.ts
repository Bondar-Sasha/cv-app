import { gql, useQuery } from "@apollo/client";
import { Language } from "cv-graphql";

export type AllLanguagesResult = {
  languages: [Language]
};


export const GET_ALL_LANGUAGES = gql`
  query GetAllLanguages {
    languages {
        id
        created_at
        iso2
        name
        native_name
    }
  }
`;

export const useGetAllLanguages = () => {
  return useQuery<AllLanguagesResult>(GET_ALL_LANGUAGES)}