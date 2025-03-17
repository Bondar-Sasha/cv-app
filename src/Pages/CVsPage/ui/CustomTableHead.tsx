import {WrapperButton} from '@/Features'
import {SearchInput} from '@/Shared'
import {TableCell, TableHead, TableRow, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import AddIcon from '@mui/icons-material/Add'
import {FC} from 'react'

interface CustomTableHeadProps {
  setOpenForm: (value: boolean) => void
}

const CustomTableHead: FC<CustomTableHeadProps> = ({setOpenForm}) => {
  const {t} = useTranslation()

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{borderBottom: 'none'}}>
          <SearchInput placeholder="Search" />
        </TableCell>
        <TableCell sx={{borderBottom: 'none'}} />
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
        {['Name', 'Education', 'Employee'].map((item) => (
          <TableCell key={item}>
            <Typography variant="subtitle1" fontWeight="500">
              {t(item)}
            </Typography>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default CustomTableHead
