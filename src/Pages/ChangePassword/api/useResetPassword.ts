import { gql,  useMutation } from "@apollo/client";
import type {  ResetPasswordInput } from "cv-graphql";

export type PasswordResetArgs = {
  auth: ResetPasswordInput;
};


export const RESET = gql`
  mutation PasswordReset($auth: ResetPasswordInput!) {
    resetPassword(auth: $auth) 
  }
`;

export const useResetPassword = () => {
  return useMutation<void, PasswordResetArgs>(RESET)
}