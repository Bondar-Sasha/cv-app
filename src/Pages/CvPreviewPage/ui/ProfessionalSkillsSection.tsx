import {TypographyTitle} from '@/Shared'
import {
  SectionBox,
  TableCellInfo,
  TableCellLast,
  TableCellTechno,
} from './StyledComponents'
import {Paper, Table, TableBody, TableContainer, TableRow} from '@mui/material'
import TableHeadPreview from './TableHeadPreview'

const ProfessionalSkillsSection = () => {
  return (
    <>
      <SectionBox>
        <TypographyTitle title="Professional skills" sx={{marginBottom: '0'}} />
      </SectionBox>

      <TableContainer
        component={Paper}
        sx={{
          backgroundColor: 'transparent',
          boxShadow: 'none',
        }}
      >
        <Table sx={{tableLayout: 'fixed', width: '100%'}}>
          <TableHeadPreview />

          <TableBody>
            <TableRow>
              <TableCellTechno
                rowSpan={3}
                sx={{
                  color: 'rgb(198, 48, 49)',

                  verticalAlign: 'top',
                  borderBottom: '1px solid rgb(189, 189, 189)',
                }}
              >
                Programming languages
              </TableCellTechno>
              <TableCellTechno>JavaScript</TableCellTechno>
              <TableCellInfo>4</TableCellInfo>
              <TableCellInfo> 2023</TableCellInfo>
            </TableRow>

            <TableRow>
              <TableCellTechno>TypeScript</TableCellTechno>
              <TableCellInfo>4</TableCellInfo>
              <TableCellInfo> 2023</TableCellInfo>
            </TableRow>

            <TableRow>
              <TableCellLast>Python</TableCellLast>
              <TableCellLast></TableCellLast>
              <TableCellLast></TableCellLast>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default ProfessionalSkillsSection
