import {InnerWrapper} from '@/Pages/ui/StyledComponents'
import HeaderUserPage, {HeaderLinks} from './HeaderUserPage'
import {FC} from 'react'

export interface OneUserLayout {
  path: HeaderLinks
  page: React.ReactElement
}

const OneUserLayout: FC<OneUserLayout> = ({path, page}) => {
  return (
    <>
      <HeaderUserPage path={path} />
      <InnerWrapper>{page}</InnerWrapper>
    </>
  )
}

export default OneUserLayout
