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
        email
      }
      access_token
    }
  }
`;

export const useSignup = () => {
  return useMutation<SignupResult, SignupArgs>(SIGNUP)
}
