import {gql, useMutation} from '@apollo/client'

const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`
interface DeleteAvatarReq {
  avatar: {userId: string}
}
type DeleteAvatarRes = void

export const useDeleteAvatar = () => {
  const [deleteAvatar, deleteAvatarFetching] = useMutation<
    DeleteAvatarRes,
    DeleteAvatarReq
  >(DELETE_AVATAR)
  return {
    deleteAvatar,
    deleteFetching: deleteAvatarFetching.loading,
    deleteData: deleteAvatarFetching.data,
  }
}
