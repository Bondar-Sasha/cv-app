import {FC} from 'react'
interface UploadLogoProps {
  color: string
}

const UploadLogo: FC<UploadLogoProps> = ({color}) => {
  return (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
      <path
        d="M26.4001 22.6249V26.9999H8.90007V22.6249H5.9834V26.9999C5.9834 28.6041 7.2959 29.9166 8.90007 29.9166H26.4001C28.0042 29.9166 29.3167 28.6041 29.3167 26.9999V22.6249H26.4001ZM10.3584 13.8749L12.4146 15.9312L16.1917 12.1687V24.0833H19.1084V12.1687L22.8855 15.9312L24.9417 13.8749L17.6501 6.58325L10.3584 13.8749Z"
        fill={color}
      />
    </svg>
  )
}

export default UploadLogo
