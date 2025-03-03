import { gql,  useLazyQuery } from "@apollo/client";
import {  SkillCategory } from "cv-graphql";


export type SkillsCategoryResult = {
  skillCategories: [SkillCategory]
};

export const GET_SKILLS_CATEGORY = gql`
  query GetSkillsCategories {
    skillCategories {
        id
        name
        order
    }
  }
`;

export const useGetSkillsCategories = () => {
  return useLazyQuery<SkillsCategoryResult>(GET_SKILLS_CATEGORY);
};

