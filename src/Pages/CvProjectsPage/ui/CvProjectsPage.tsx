import {CvLayout} from '@/Features'
import {FC} from 'react'
import ProjectHandlerPopup from './ProjectHandlerPopup'

const CvProjectsPage: FC = () => {
  return (
    <CvLayout
      path="projects"
      page={
        <div>
          <ProjectHandlerPopup
            open
            isCreating
            onClose={() => {}}
            cvId="728"
            projectId="30"
          />
        </div>
      }
    />
  )
}

export default CvProjectsPage
