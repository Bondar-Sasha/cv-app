import { gql,  useMutation } from "@apollo/client";
import type { UpdateProfileSkillInput } from "cv-graphql";

export type UpdateSkillArgs = {
  skill: UpdateProfileSkillInput
};
 

export const UPDATE_USER_SKILL = gql`
    mutation AddUserSkill($skill: UpdateProfileSkillInput!) {
        updateProfileSkill(skill: $skill) {
            skills {
                name
                mastery
            }
        }
    }
`;

export const useUpdateUserSkill = () => {
  return useMutation<UpdateSkillArgs>(UPDATE_USER_SKILL)
}