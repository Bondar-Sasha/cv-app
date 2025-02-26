import { gql, useLazyQuery } from "@apollo/client";
import type { AuthInput, AuthResult } from "cv-graphql";

export type LoginArgs = {
  auth: AuthInput;
};

export type LoginResult = {
  login: AuthResult;
};

export const LOGIN = gql`
  query Login($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        email
      }
      access_token
      refresh_token
    }
  }
`;

export const useLogin = () => {
  return useLazyQuery<LoginResult, LoginArgs>(LOGIN)
}