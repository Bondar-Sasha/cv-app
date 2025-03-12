import {FC} from 'react'
import {StyledButton} from '@/Shared'
import {LanguageProficiency} from 'cv-graphql'
import {
  ProficiencySpan,
  LanguageSpan,
  WrapperLanguages,
} from './StyledComponents'
import {LanguagesPercents} from '../utilits/languagesProficiency'

interface LanguagesListProps {
  languages: LanguageProficiency[] | undefined
  isEdit: boolean
  edit: string[]
  onEditUpdate: (elem: LanguageProficiency) => void
  onEditDelete: (name: string) => void
}

const LanguagesList: FC<LanguagesListProps> = ({
  languages,
  isEdit,
  edit,
  onEditUpdate,
  onEditDelete,
}) => (
  <WrapperLanguages>
    {languages?.map((elem) => (
      <StyledButton
        onClick={() => (isEdit ? onEditDelete(elem.name) : onEditUpdate(elem))}
        key={elem.name}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          flexBasis: '33%',
          minWidth: '220px',
          gap: '30px',
          textTransform: 'initial',
        }}
        children={
          <>
            <ProficiencySpan
              proficiency={LanguagesPercents[elem.proficiency]}
              willDelete={edit.includes(elem.name)}
            >
              {elem.proficiency}
            </ProficiencySpan>
            <LanguageSpan willDelete={edit.includes(elem.name)}>
              {elem.name}
            </LanguageSpan>
          </>
        }
      />
    ))}
  </WrapperLanguages>
)

export default LanguagesList
