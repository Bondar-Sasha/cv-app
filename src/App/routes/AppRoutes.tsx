import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'

import SecureRoute from './SecureRoute'
import {AppRouterMap} from '@/Shared'
import {Auth, ChangePassword, ResetPassword} from '@/Pages'
import {CommonPageLayout} from '@/Widgets'

const {
  users,
  userCVs,
  userLanguages,
  userProfile,
  userSkills,
  CVDetails,
  CVPreview,
  CVProjects,
  CVSkills,
  CVs,
  positions,
  project,
  projects,
  departments,
  skills,
  languages,
  singUp,
  login,
  resetPassword,
  forgotPassword,
  home,
} = AppRouterMap

const AppRoutes: FC = () => {
  const isUser = false
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SecureRoute redirectTo="/" isRedirection={!!isUser}>
              <CommonPageLayout />
            </SecureRoute>
          }
        >
          <Route path={home.path} element={<Navigate to="/users" replace />} />
          <Route path={users.path} element={<>users</>} />
          <Route path={userProfile.path()} element={<>user profile</>} />
          <Route path={userSkills.path()} element={<>user skills</>} />
          <Route path={userLanguages.path()} element={<>user lang</>} />
          <Route path={userCVs.path()} element={<>user cvs</>} />
          <Route path={projects.path} element={<>projects</>} />
          <Route path={project.path()} element={<>project details</>} />
          <Route path={CVs.path} element={<>cvs</>} />
          <Route path={CVDetails.path()} element={<>cv details</>} />
          <Route path={CVSkills.path()} element={<>cv skills</>} />
          <Route path={CVProjects.path()} element={<>cv projects</>} />
          <Route path={CVPreview.path()} element={<>cv preview</>} />
          <Route path={departments.path} element={<>departments</>} />
          <Route path={positions.path} element={<>positions</>} />
          <Route path={skills.path} element={<>skills</>} />
          <Route path={languages.path} element={<>languages</>} />
        </Route>

        <Route
          path={singUp.path}
          element={
            <SecureRoute redirectTo="/" isRedirection={!!isUser}>
              <Auth location="signup" />
            </SecureRoute>
          }
        />
        <Route
          path={login.path}
          element={
            <SecureRoute redirectTo="/" isRedirection={!!isUser}>
              <Auth location="login" />
            </SecureRoute>
          }
        />
        <Route
          path={forgotPassword.path}
          element={
            <SecureRoute redirectTo="/" isRedirection={!!isUser}>
              <ChangePassword />
            </SecureRoute>
          }
        />
        <Route
          path={resetPassword.path}
          element={
            <SecureRoute redirectTo="/" isRedirection={!!isUser}>
              <ResetPassword />
            </SecureRoute>
          }
        />
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
