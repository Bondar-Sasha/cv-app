import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {
  ResponsiveBox,
  SkillItemWarpper,
  SkillsWarpper,
} from './StyledComponents'
import SkillItem from './SkillItem'
import {Typography} from '@mui/material'
import {SkillPart} from './AllSkills'

interface SkillPartProps {
  data: SkillPart
}

const SkillsPart: FC<SkillPartProps> = ({data}) => {
  const {t} = useTranslation()
  return (
    <SkillsWarpper>
      <Typography variant="h6" fontSize={'1rem'}>
        {t(data.part)}
      </Typography>

      <SkillItemWarpper>
        {data.elements.map((elem) => (
          <ResponsiveBox key={elem.name}>
            <SkillItem name={elem.name} proficiency={elem.size} />
          </ResponsiveBox>
        ))}
      </SkillItemWarpper>
    </SkillsWarpper>
  )
}

export default SkillsPart
