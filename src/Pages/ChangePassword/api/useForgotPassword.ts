import { gql, useMutation } from "@apollo/client";
import { ForgotPasswordInput } from "cv-graphql";

export type ForgotPasswordArgs = {
  auth: ForgotPasswordInput;
};

export const FORGOTPASSWORD = gql`
  mutation ForgotPassword($auth: ForgotPasswordInput!) {
    forgotPassword(auth: $auth) 
  }
`;

export const useForgotPassword = () => {
  return useMutation<void, ForgotPasswordArgs>(FORGOTPASSWORD)
}