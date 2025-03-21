import {gql, useMutation} from '@apollo/client'
import {DeleteAvatarInput} from 'cv-graphql'

const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`

export const useDeleteAvatar = () => {
  const [deleteAvatar, deleteAvatarFetching] = useMutation<
    void,
    {avatar: DeleteAvatarInput}
  >(DELETE_AVATAR)
  return {
    deleteAvatar,
    deleteFetching: deleteAvatarFetching.loading,
    deleteData: deleteAvatarFetching.data,
  }
}
