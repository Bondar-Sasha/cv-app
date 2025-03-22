import {TypographyTitle} from '@/Shared'
import {
  CustomTable,
  SectionBox,
  StyledTableCell,
  TableCellInfo,
  TableCellTechno,
} from './StyledComponents'
import {
  Paper,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import {SkillMastery} from 'cv-graphql'
import {FC} from 'react'

interface ProfessionalSkillsSectionProps {
  data: SkillMastery[]
}

const ProfessionalSkillsSection: FC<ProfessionalSkillsSectionProps> = ({
  data,
}) => {
  return (
    <>
      <SectionBox>
        <TypographyTitle title="Professional skills" sx={{marginBottom: '0'}} />
      </SectionBox>

      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 'none',
        }}
      >
        <CustomTable>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{width: 'auto', textAlign: 'left'}}>
                Skills
              </StyledTableCell>
              <StyledTableCell>Mastery</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((elem) => (
              <TableRow
                key={elem.name}
                sx={{borderBottom: '1px solid rgb(189, 189, 189)'}}
              >
                <TableCellTechno>{elem.name}</TableCellTechno>
                <TableCellInfo>{elem.mastery}</TableCellInfo>
              </TableRow>
            ))}
          </TableBody>
        </CustomTable>
      </TableContainer>
    </>
  )
}

export default ProfessionalSkillsSection
