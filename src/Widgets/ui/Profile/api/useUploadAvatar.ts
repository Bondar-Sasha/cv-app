import {gql, useMutation} from '@apollo/client'
import {UploadAvatarInput} from 'cv-graphql'

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`

export const useUploadAvatar = () => {
  const [uploadAvatar, uploadAvatarFetching] = useMutation<
    string,
    {avatar: UploadAvatarInput}
  >(UPLOAD_AVATAR)
  return {
    uploadAvatar,
    uploadFetching: uploadAvatarFetching.loading,
    uploadData: uploadAvatarFetching.data,
  }
}
