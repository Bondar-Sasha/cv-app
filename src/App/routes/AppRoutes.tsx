import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'

import SecureRoute from './SecureRoute'
import {AppRouterMap, useUser} from '@/Shared'
import {
  Auth,
  ChangePassword,
  LanguagesPage,
  ResetPassword,
  SettingsPage,
  SkillsPage,
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
  const {user} = useUser()

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <SecureRoute redirectTo="/auth/login" isRedirection={!user}>
              <CommonPageLayout />
            </SecureRoute>
          }
        >
          <Route index element={<Navigate to="/users" replace />} />
          <Route path={users.path} element={<UsersPage />} />
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
          <Route path={skills.path} element={<SkillsPage />} />
          <Route path={languages.path} element={<LanguagesPage />} />
          <Route path={settings.path} element={<SettingsPage />} />
        </Route>

        <Route
          path={singUp.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!user}>
              <Auth location="signup" />
            </SecureRoute>
          }
        />
        <Route
          path={login.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!user}>
              <Auth location="login" />
            </SecureRoute>
          }
        />
        <Route
          path={forgotPassword.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!user}>
              <ChangePassword />
            </SecureRoute>
          }
        />
        <Route
          path={resetPassword.path}
          element={
            <SecureRoute redirectTo="/users" isRedirection={!!user}>
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
