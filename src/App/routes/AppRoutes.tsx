import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'

import SecureRoute from './SecureRoute'
import {AppRouterMap} from '@/Shared'
import {
  Auth,
  ChangePassword,
  CvDetailsPage,
  CvPreviewPage,
  CvProjectsPage,
  CvSkillsPage,
  CVsPage,
  LanguagesPage,
  ResetPassword,
  SettingsPage,
  SkillsPage,
  UserLanguagesPage,
  UserProfilePage,
  UserSkillsPage,
  UsersPage,
} from '@/Pages'
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
  settings,
  singUp,
  login,
  resetPassword,
  forgotPassword,
} = AppRouterMap

const AppRoutes: FC = () => {
  const isUser = false
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!isUser}>
              <CommonPageLayout />
            </SecureRoute>
          }
        >
          <Route index element={<Navigate to="/users" replace />} />
          <Route path={users.path} element={<UsersPage />} />
          <Route path={userProfile.path()} element={<UserProfilePage />} />
          <Route path={userSkills.path()} element={<UserSkillsPage />} />
          <Route path={userLanguages.path()} element={<UserLanguagesPage />} />
          <Route path={userCVs.path()} element={<>user cvs</>} />
          <Route path={projects.path} element={<>projects</>} />
          <Route path={project.path()} element={<>project details</>} />
          <Route path={CVs.path} element={<CVsPage />} />
          <Route path={CVDetails.path()} element={<CvDetailsPage />} />
          <Route path={CVSkills.path()} element={<CvSkillsPage />} />
          <Route path={CVProjects.path()} element={<CvProjectsPage />} />
          <Route path={CVPreview.path()} element={<CvPreviewPage />} />
          <Route path={departments.path} element={<>departments</>} />
          <Route path={positions.path} element={<>positions</>} />
          <Route path={skills.path} element={<SkillsPage />} />
          <Route path={languages.path} element={<LanguagesPage />} />
          <Route path={settings.path} element={<SettingsPage />} />
        </Route>

        <Route
          path={singUp.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!isUser}>
              <Auth location="signup" />
            </SecureRoute>
          }
        />
        <Route
          path={login.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!isUser}>
              <Auth location="login" />
            </SecureRoute>
          }
        />
        <Route
          path={forgotPassword.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!isUser}>
              <ChangePassword />
            </SecureRoute>
          }
        />
        <Route
          path={resetPassword.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!isUser}>
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
