import {FC} from 'react'
import Box from '@mui/material/Box'
import {StyledLink} from '@/Shared/ui'
import {Link} from 'react-router-dom'

interface LinkProps {
  to: string
  label: string
  active: boolean
}

interface ListLinks {
  arrLinks: LinkProps[]
}

const StyledLinkList: FC<ListLinks> = ({arrLinks}) => {
  return (
    <Box display="flex" alignItems="center">
      {arrLinks.map((link, index) => (
        <StyledLink
          key={index}
          to={link.to}
          active={link.active}
          component={Link}
        >
          {link.label}
        </StyledLink>
      ))}
    </Box>
  )
}

export default StyledLinkList
