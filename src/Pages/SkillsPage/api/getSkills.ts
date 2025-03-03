import { gql, useQuery } from "@apollo/client";
import { User } from "cv-graphql";

export type IdArgs = {
  userId: string;
};

export type SkillsResult = {
  user: User;
};


export const GETSKILLS = gql`
  query GetSkills($userId: ID!) {
    user(userId: $userId) {
        profile {
            skills {
                name
                categoryId
                mastery
            }
        }
    }
  }
`;

export const useGetSkills = (userId: string) => {
  return useQuery<SkillsResult, IdArgs>(GETSKILLS, {
    variables: { userId },
  });
};