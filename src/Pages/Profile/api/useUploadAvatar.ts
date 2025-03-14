import {gql, useMutation} from '@apollo/client'

const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`
interface UploadAvatarReq {
  avatar: {userId: string; base64: string; size: number; type: string}
}
type UploadAvatarRes = string

export const useUploadAvatar = () => {
  const [uploadAvatar, uploadAvatarFetching] = useMutation<
    UploadAvatarRes,
    UploadAvatarReq
  >(UPLOAD_AVATAR)
  return {
    uploadAvatar,
    uploadFetching: uploadAvatarFetching.loading,
    uploadData: uploadAvatarFetching.data,
  }
}
