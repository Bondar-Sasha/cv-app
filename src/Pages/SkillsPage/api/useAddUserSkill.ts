import { gql,  useMutation } from "@apollo/client";
import type { AddProfileSkillInput,  Profile } from "cv-graphql";

export type AddSkillArgs = {
  skill: AddProfileSkillInput
};

 export type AddSkillResult = {
   data: Profile
 };
 

export const ADD_USER_SKILL = gql`
  mutation AddUserSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      skills {
        name
        mastery
      }
    }
  }
`;

export const useAddUserSkill = () => {
  return useMutation<AddSkillResult, AddSkillArgs>(ADD_USER_SKILL)
}