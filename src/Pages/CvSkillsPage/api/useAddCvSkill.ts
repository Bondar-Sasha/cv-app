import { gql,  useMutation } from "@apollo/client";
import type { AddCvSkillInput, Cv } from "cv-graphql";

export type AddCvSkillArgs = {
  skill: AddCvSkillInput
};

export type AddCvSkillResult = {
  data: Cv
};
 
export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      skills {
        name
        mastery
        categoryId
      }
    }
  }
`;

export const useAddCvSkill = () => {
  return useMutation<AddCvSkillResult, AddCvSkillArgs>(ADD_CV_SKILL)
}