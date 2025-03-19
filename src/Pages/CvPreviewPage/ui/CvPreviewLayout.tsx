import {useParams} from 'react-router-dom'
import {useGetCvInfoForDetails} from '../api/useGetInfoForPreview'
import {LoaderBackdrop, TypographyTitle} from '@/Shared'
import {RefObject, useEffect, useId, useRef} from 'react'
import {toast} from 'react-toastify'
import {Box} from '@mui/material'
import MainInfo from './MainInfo'
import ProjectsSection from './ProjectsSection'
import ProfessionalSkillsSection from './ProfessionalSkillsSection'
import {SectionBox, WrapperPreview} from './StyledComponents'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const CvPreviewLayout = () => {
  const cvId = useParams().cvId || ''
  const btnId = useId()
  const {data, loading, error} = useGetCvInfoForDetails(cvId)

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
    if (error) {
      toast.error(error.message)
    }
    if (data) {
      // Console.log(data)
    }
  }, [error, data])

  if (loading) {
    return <LoaderBackdrop loading={loading} />
  }

  return (
    <WrapperPreview>
      {data && (
        <>
          <Box ref={mainInfoRef} sx={{width: '100%'}}>
            <MainInfo
              cvData={data.cv}
              btnId={btnId}
              handleExport={() => void handleExport()}
            />
          </Box>
          <Box>
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
              />
            ))}
          </Box>
          <Box ref={skillsSectionRef}>
            <ProfessionalSkillsSection />
          </Box>
        </>
      )}
    </WrapperPreview>
  )
}

export default CvPreviewLayout
