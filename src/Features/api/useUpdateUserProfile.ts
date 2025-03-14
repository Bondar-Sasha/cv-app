import {gql, useMutation} from '@apollo/client'
import {useCallback} from 'react'

const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      id
    }
  }
`
const UPDATE_USER_PROFILE = gql`
  mutation UpdateUserProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
    }
  }
`
interface UpdateUser {
  user: {userId: string; departmentId: string; positionId: string}
}
interface UpdateProfile {
  profile: {userId: string; last_name: string; first_name: string}
}

export const useUpdateUserProfile = () => {
  const [updateUser, updateUserFetching] = useMutation<void, UpdateUser>(
    UPDATE_USER
  )
  const [updateUserProfile, updateUserProfileFetching] = useMutation<
    void,
    UpdateProfile
  >(UPDATE_USER_PROFILE)
  const update = useCallback(
    async ({
      userId,
      last_name,
      first_name,
      departmentId,
      positionId,
    }: UpdateUser['user'] & UpdateProfile['profile']) => {
      return Promise.all([
        updateUser({variables: {user: {userId, departmentId, positionId}}}),
        updateUserProfile({
          variables: {profile: {userId, last_name, first_name}},
        }),
      ])
    },
    [updateUser, updateUserProfile]
  )
  return {
    update,
    isFetching: updateUserFetching.loading || updateUserProfileFetching.loading,
  }
}
