import {FC} from 'react'

const SVGMap = (color: string) => ({
  users: (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.33 17.66 5 16 5C14.33 5 13 6.33 13 8C13 9.66 14.33 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.33 9.66 5 8 5C6.33 5 5 6.33 5 8C5 9.66 6.33 11 8 11ZM8 13C5.66 13 1 14.16 1 16.5L1 19L15 19L15 16.5C15 14.16 10.33 13 8 13ZM16 13C15.71 13 15.37 13.02 15.02 13.04C16.18 13.89 17 15.02 17 16.5L17 19L23 19L23 16.5C23 14.16 18.33 13 16 13Z"
        fill={color}
        fill-opacity="1px"
        fill-rule="nonzero"
      />
    </svg>
  ),
  up: (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M16 6L18.29 8.29L13.41 13.16L9.41 9.16L2 16.58L3.41 18L9.41 12L13.41 16L19.7 9.7L22 12L22 6L16 6Z"
        fill={color}
        fill-opacity="0.600000"
        fill-rule="nonzero"
      />
    </svg>
  ),
  profile: (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M13.16 4L18 8.83L18 20L6 20L6 4L13.16 4ZM14 2L6 2C4.89 2 4 2.89 4 4L4 20C4 21.1 4.89 22 6 22L18 22C19.1 22 20 21.1 20 20L20 8L14 2ZM12 14C13.1 14 14 13.1 14 12C14 10.89 13.1 10 12 10C10.89 10 10 10.89 10 12C10 13.1 10.89 14 12 14ZM16 17.43C16 16.62 15.52 15.89 14.77 15.58C13.93 15.21 12.99 15 12 15C11 15 10.06 15.21 9.22 15.58C8.47 15.89 8 16.62 8 17.43L8 18L16 18L16 17.43Z"
        fill={color}
        fill-opacity="0.600000"
        fill-rule="nonzero"
      />
    </svg>
  ),
  lang: (
    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none">
      <desc>Created with Pixso.</desc>
      <defs />
      <path
        id="Vector"
        d="M12.87 15.06L10.33 12.56L10.35 12.52C12.1 10.58 13.33 8.35 14.06 6L17 6L17 4L10 4L10 2L8 2L8 4L1 4L1 5.99L12.16 5.99C11.5 7.91 10.43 9.75 9 11.35C8.06 10.31 7.29 9.18 6.68 8L4.68 8C5.41 9.62 6.41 11.16 7.66 12.56L2.58 17.58L4 19L9 14L12.1 17.1L12.87 15.06ZM18.5 10L16.5 10L12 22L14 22L15.12 19L19.87 19L21 22L23 22L18.5 10ZM15.87 17L17.5 12.66L19.12 17L15.87 17Z"
        fill={color}
        fill-opacity="0.600000"
        fill-rule="nonzero"
      />
    </svg>
  ),
})

interface AsideSvgProps {
  color: string
  type: keyof ReturnType<typeof SVGMap>
}

const AsideSvg: FC<AsideSvgProps> = ({color, type}) => {
  return SVGMap(color)[type]
}

export default AsideSvg
