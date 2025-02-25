import {FC} from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom'

import {} from '@/Pages'

const AppRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<>apptest</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
