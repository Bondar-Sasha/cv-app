import {gql} from '@apollo/client'

export const USER = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      is_verified
      profile {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
      cvs {
        id
        created_at
        name
        education
        description
        user {
          id
        }
      }
      department {
        id
      }
      department_name
      position {
        id
      }
      position_name
      role
    }
  }
`
