import {Box, Typography} from '@mui/material'
import {FC, useContext, useEffect, useState} from 'react'
import {SkillBar, SkillBarFilled, SkillItemButton} from './StyledComponents'
import {EditContext} from './AllSkills'

export interface SkillItemProps {
  name: string
  proficiency: number
}

const SkillItem: FC<SkillItemProps> = ({name, proficiency}) => {
  const context = useContext(EditContext)
  const [transform, setTransform] = useState(false)
  const [reverseTransform, setReverseTransform] = useState(false)

  const helpTranform = (state: boolean): void => {
    setTransform(state)
    setReverseTransform(!state)
  }

  useEffect(() => {
    if (!context?.isEdit) {
      helpTranform(false)
    }
  }, [context?.isEdit])

  const handleClick = () => {
    if (context?.isEdit) {
      context.setEdit((prev) => {
        const newSet = new Set(prev)
        if (newSet.has(name)) {
          newSet.delete(name)
          helpTranform(false)
        } else {
          newSet.add(name)
          helpTranform(true)
        }
        return newSet
      })
    } else {
      context?.formOpen()
    }
  }

  return (
    <SkillItemButton onClick={handleClick}>
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
