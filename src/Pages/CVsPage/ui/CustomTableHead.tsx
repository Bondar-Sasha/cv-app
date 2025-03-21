import {WrapperButton} from '@/Features'
import {SearchInput} from '@/Shared'
import {
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {FC} from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import {SortTypes} from './CVsPage'

interface CustomTableHeadProps {
  setOpenForm: (value: boolean) => void
  searchState: string
  setSearchState: (value: string) => void
  sortState: {
    field: string
    direction: SortTypes
  }
  onSort: (field: string) => void
}

const CustomTableHead: FC<CustomTableHeadProps> = ({
  setOpenForm,
  searchState,
  setSearchState,
  sortState,
  onSort,
}) => {
  const {t} = useTranslation()

  return (
    <TableHead
      sx={(theme) => ({
        position: 'sticky',
        top: '0',
        left: '0',
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.drawer + 1,
      })}
    >
      <TableRow>
        <TableCell sx={{borderBottom: 'none'}} colSpan={2}>
          <SearchInput
            placeholder={`${t('Search')}...`}
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
            reset={() => setSearchState('')}
          />
        </TableCell>
        <TableCell sx={{borderBottom: 'none'}}>
          <WrapperButton
            onClick={() => setOpenForm(true)}
            color="rgb(198, 48, 49)"
          >
            <AddIcon style={{marginRight: '14px'}} /> {t('Create CV')}
          </WrapperButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="subtitle1" fontWeight="500">
            {t('Name')}
          </Typography>
          <IconButton onClick={() => onSort('name')}>
            <ArrowUpwardIcon
              sx={{
                transform:
                  sortState.field === 'name' && sortState.direction === 'desc'
                    ? 'rotate(180deg)'
                    : 'none',
                transition: 'transform 0.2s ease',
              }}
            />
          </IconButton>
        </TableCell>

        <TableCell>
          <Typography variant="subtitle1" fontWeight="500">
            {t('Education')}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant="subtitle1" fontWeight="500">
            {t('Employee')}
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  )
}

export default CustomTableHead
