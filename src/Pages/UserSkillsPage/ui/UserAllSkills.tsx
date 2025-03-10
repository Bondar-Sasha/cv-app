import SkillsPart from '@/Features/ui/AllSkills/SkillsPart'
import useSkillsData from '@/Features/model/UniversalSkillsLogic/hooks/useSkillsData'
import {LoaderBackdrop} from '@/Shared'
import {Box} from '@mui/material'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'

const UserAllSkills = () => {
  const ID = useParams().userId || ''
  const {error, groupedData, loading} = useSkillsData(ID)

  if (error) {
    toast(error.message)
  }

  if (loading) {
    return <LoaderBackdrop loading />
  }

  return (
    <Box width={'100%'}>
      {groupedData.map((elem) => (
        <SkillsPart key={elem.category} data={elem} />
      ))}
    </Box>
  )
}

export default UserAllSkills
