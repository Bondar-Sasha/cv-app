import {useParams} from 'react-router-dom'
import {useGetCvInfoForDetails} from '../api/useGetInfoForPreview'
import {LoaderBackdrop, Params, TypographyTitle} from '@/Shared'
import {RefObject, useContext, useEffect, useId, useRef} from 'react'
import {toast} from 'react-toastify'
import MainInfo from './MainInfo'
import ProjectsSection from './ProjectsSection'
import ProfessionalSkillsSection from './ProfessionalSkillsSection'
import {CustomBox, SectionBox, WrapperPreview} from './StyledComponents'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import {useGetSkills} from '@/Features'
import {BreadContext, getCurrentUserID} from '@/App'

const CvPreviewLayout = () => {
  const cvId = useParams<Params>().cvId
  const userId = getCurrentUserID()
  const btnId = useId()
  const breadcrumb = useContext(BreadContext)
  const {data, loading, error} = useGetCvInfoForDetails(cvId || '')
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetSkills(userId)

  const mainInfoRef = useRef<HTMLDivElement>(null)
  const skillsSectionRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<HTMLDivElement[]>([])

  const handleExport = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const captureSection = async (
      sectionRef: RefObject<HTMLDivElement>,
      pdf: jsPDF,
      addPage = false
    ) => {
      if (sectionRef.current) {
        const canvas = await html2canvas(sectionRef.current, {
          scale: 2,
          useCORS: true,
          ignoreElements: (element) => {
            return element.id === btnId
          },
        })

        const imgData = canvas.toDataURL('image/png')
        const imgWidth = 190
        const imgHeight = (canvas.height * imgWidth) / canvas.width

        if (addPage) pdf.addPage()
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight)
      }
    }

    try {
      await captureSection(mainInfoRef, pdf)
      for (const ref of itemRefs.current) {
        await captureSection({current: ref}, pdf, true)
      }
      await captureSection(skillsSectionRef, pdf, true)
      pdf.save(`${data?.cv.name}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    }
  }

  useEffect(() => {
    if (data) {
      breadcrumb.setCurrentBread(data.cv.name)
    }
  }, [breadcrumb, data])

  useEffect(() => {
    if (error || userError) {
      toast.error(error?.message || userError?.message)
    }
  }, [error, userError])

  if (loading || userLoading) {
    return <LoaderBackdrop loading={loading} />
  }

  if (!data || !userData) {
    return null
  }

  return (
    <WrapperPreview
      sx={{
        maxHeight: '85vh',
        overflow: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <CustomBox ref={mainInfoRef}>
        <MainInfo
          userInfo={userData?.user?.profile}
          cvData={data.cv}
          btnId={btnId}
          handleExport={() => void handleExport()}
        />
      </CustomBox>
      <CustomBox>
        <SectionBox>
          <TypographyTitle title="Projects" sx={{marginBottom: '0'}} />
        </SectionBox>
        {data.cv?.projects?.map((elem, index) => (
          <ProjectsSection
            refs={(el) => {
              if (el) {
                itemRefs.current[index] = el
              }
            }}
            key={elem.project.id}
            dataProject={elem}
            userInfo={userData?.user}
          />
        ))}
      </CustomBox>
      <CustomBox ref={skillsSectionRef}>
        <ProfessionalSkillsSection data={data.cv.skills} />
      </CustomBox>
    </WrapperPreview>
  )
}

export default CvPreviewLayout
