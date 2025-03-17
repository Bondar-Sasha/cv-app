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
        name
      }
      department_name
      position {
        id
        name
      }
      position_name
      role
    }
  }
`
export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
    }
  }
`
export const UPDATE_POSITION = gql`
  mutation UpdatePosition($position: UpdatePositionInput!) {
    updatePosition(position: $position) {
      id
    }
  }
`
export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
    }
  }
`
