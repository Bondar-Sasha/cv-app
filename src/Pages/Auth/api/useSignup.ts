import { gql, useMutation } from "@apollo/client";
import type { AuthInput, AuthResult } from "cv-graphql";

export type SignupArgs = {
  auth: AuthInput;
};

export type SignupResult = {
  signup: AuthResult;
};

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        profile {
          full_name
        }
        email
      }
      access_token
      refresh_token
    }
  }
`;

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP)
}
