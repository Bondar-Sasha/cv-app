import {FC, ReactNode} from 'react'
import {styled} from '@mui/material/styles'

interface CommonPageLayoutProps {
  children: ReactNode
}

const Header = styled('header')(({theme}) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  header: '56px',
  width: '100%',
}))
const Main = styled('header')(({theme}) => ({
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.default,
  width: '100%',
  flexGrow: 1,
}))

const CommonPageLayout: FC<CommonPageLayoutProps> = ({children}) => {
  return (
    <>
      <Header></Header>
      <Main>
        <aside></aside>
        <div>{children}</div>
      </Main>
    </>
  )
}

export default CommonPageLayout
