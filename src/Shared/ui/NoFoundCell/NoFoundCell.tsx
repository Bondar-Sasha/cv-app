import {StyledButton} from '@/Shared'
import {TableCell, TableRow, Typography} from '@mui/material'
import {FC} from 'react'
import {useTranslation} from 'react-i18next'

interface NoFoundCellProps {
  reset: () => void
}

const NoFoundCell: FC<NoFoundCellProps> = ({reset}) => {
  const {t} = useTranslation()

  return (
    <TableRow
      sx={{
        borderBottom: 'none',
        width: '100%',
      }}
    >
      <TableCell
        colSpan={3}
        sx={{
          width: '100%',
          borderBottom: 'none',
          textAlign: 'center',
          paddingTop: '128px',
        }}
      >
        <Typography variant="h5" sx={{marginBottom: '15px'}}>
          {t('No results found')}
        </Typography>
        <Typography variant="body2" sx={{marginBottom: '15px'}}>
          {t('Try another search, check the spelling or use a boarder term')}
        </Typography>
        <StyledButton
          children={'Reset search'}
          onClick={reset}
          sx={{maxWidth: '40%', margin: '0 auto'}}
        />
      </TableCell>
    </TableRow>
  )
}

export default NoFoundCell
