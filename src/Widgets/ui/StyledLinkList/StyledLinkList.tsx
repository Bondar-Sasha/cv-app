import {FC} from 'react'
import Box from '@mui/material/Box'
import {StyledLink} from '@/Shared'
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

interface LinkProps {
  to: string
  label: string
  active: boolean
}

interface ListLinks {
  arrLinks: LinkProps[]
}

const StyledLinkList: FC<ListLinks> = ({arrLinks}) => {
  const {t} = useTranslation()
  return (
    <Box display="flex" alignItems="center">
      {arrLinks.map((link, index) => (
        <StyledLink
          key={index}
          to={link.to}
          active={link.active}
          component={Link}
        >
          {t(link.label)}
        </StyledLink>
      ))}
    </Box>
  )
}

export default StyledLinkList
