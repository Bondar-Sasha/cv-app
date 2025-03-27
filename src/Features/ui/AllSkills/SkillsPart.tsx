import {FC} from 'react'
import {useTranslation} from 'react-i18next'
import {
  ResponsiveBox,
  SkillItemWarpper,
  SkillsWarpper,
} from './StyledComponents'
import SkillItem from './SkillItem'
import {Typography} from '@mui/material'
import {filterData} from '@/Features/model'
import {Mastery} from 'cv-graphql'

interface SkillPartProps {
  data: filterData
}

const SkillsPart: FC<SkillPartProps> = ({data}) => {
  const {t} = useTranslation()
  return (
    <SkillsWarpper>
      <Typography variant="h6" fontSize={'1rem'}>
        {t(data.category)}
      </Typography>

      <SkillItemWarpper>
        {data.technologies.map((elem) => (
          <ResponsiveBox key={elem.name}>
            <SkillItem
              name={elem.name}
              proficiency={elem.proficiency}
              mastery={elem.mastery as Mastery}
              categoryId={elem.categoryId}
              category={data.category}
            />
          </ResponsiveBox>
        ))}
      </SkillItemWarpper>
    </SkillsWarpper>
  )
}

export default SkillsPart
