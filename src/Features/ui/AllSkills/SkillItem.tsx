import {Box, Typography} from '@mui/material'
import {FC, useContext, useEffect, useState} from 'react'
import {SkillBar, SkillBarFilled, SkillItemButton} from './StyledComponents'
import {EditContext} from './AllSkills'
import {TransformedArray} from '../FormOver/FormOver'
import {useParams} from 'react-router-dom'
import {getCurrentUserID} from '@/App'
import {Mastery} from 'cv-graphql'

export interface SkillItemProps {
  name: string
  proficiency: number
  mastery: Mastery
  categoryId: string
  category: string
}

const SkillItem: FC<SkillItemProps> = ({
  name,
  proficiency,
  mastery,
  categoryId,
  category,
}) => {
  const context = useContext(EditContext)
  const [transform, setTransform] = useState(false)
  const [reverseTransform, setReverseTransform] = useState(false)
  const myID = getCurrentUserID()
  const {userId} = useParams()
  const ID = userId ?? myID

  const helpTransform = (state: boolean): void => {
    setTransform(state)
    setReverseTransform(!state)
  }

  useEffect(() => {
    if (!context?.isEdit) {
      helpTransform(false)
    }
  }, [context?.isEdit])

  const handleClick = () => {
    if (context?.isEdit) {
      context.setEdit((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(name)) {
          newSet.delete(name)
          helpTransform(false)
        } else {
          newSet.add(name)
          helpTransform(true)
        }
        return newSet
      })
    } else {
      const objData: TransformedArray = {
        value: name,
        label: name,
        id: categoryId,
        category: category,
      }
      context?.formOpen(objData, mastery)
    }
  }

  return (
    <SkillItemButton onClick={handleClick} disabled={myID !== ID}>
      <Box display="flex" alignItems="center">
        <SkillBar
          proficiency={proficiency}
          className={transform ? 'transform' : ''}
        >
          <SkillBarFilled
            proficiency={proficiency}
            className={
              transform
                ? 'transform'
                : reverseTransform
                  ? 'reverseTransform'
                  : ''
            }
          />
        </SkillBar>
      </Box>
      <Typography textAlign={'left'}>{name}</Typography>
    </SkillItemButton>
  )
}
export default SkillItem
