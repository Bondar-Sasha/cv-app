import {useParams} from 'react-router-dom'
import {useGetCvInfoForDetails} from '../api/useGetInfoForPreview'
import {LoaderBackdrop} from '@/Shared'
import {useEffect} from 'react'
import {toast} from 'react-toastify'
import {Box} from '@mui/material'
import MainInfo from './MainInfo'
import ProjectsSection from './ProjectsSection'
import ProfessionalSkillsSection from './ProfessionalSkillsSection'

const CvPreviewLayout = () => {
  const cvId = useParams().cvId || ''

  const {data, loading, error} = useGetCvInfoForDetails(cvId)

  useEffect(() => {
    if (error) {
      toast.error(error.message)
    }
    if (data) {
      //   Console.log(data)
    }
  }, [error, data])

  if (loading) {
    return <LoaderBackdrop loading={loading} />
  }

  return (
    <Box sx={{padding: ' 32px 24px'}}>
      <MainInfo />
      <ProjectsSection />
      <ProfessionalSkillsSection />
    </Box>
  )
}

export default CvPreviewLayout
