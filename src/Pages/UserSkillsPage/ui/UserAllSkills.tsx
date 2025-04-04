import SkillsPart from '@/Features/ui/AllSkills/SkillsPart'
import useSkillsData from '@/Features/model/UniversalSkillsLogic/hooks/useSkillsData'
import {LoaderBackdrop, Params} from '@/Shared'
import {Box} from '@mui/material'
import {useParams} from 'react-router-dom'
import {toast} from 'react-toastify'
import {useEffect} from 'react'

const UserAllSkills = () => {
  const {userId} = useParams<Params>()

  const {error, groupedData, loading} = useSkillsData(userId)

  useEffect(() => {
    if (error) {
      toast(error.message)
    }
  }, [error])

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
