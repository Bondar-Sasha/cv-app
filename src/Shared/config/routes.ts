interface IAppRouterMap {
  users: {label: string; path: string}
  userProfile: {label: string; path: (userId?: string | number) => string}
  userSkills: {label: string; path: (userId?: string | number) => string}
  userLanguages: {label: string; path: (userId?: string | number) => string}
  projects: {label: string; path: string}
  project: {label: string; path: (projectId?: string | number) => string}
  CVs: {label: string; path: string}
  CVDetails: {label: string; path: (cvId?: string | number) => string}
  CVSkills: {label: string; path: (cvId?: string | number) => string}
  CVProjects: {label: string; path: (cvId?: string | number) => string}
  CVPreview: {label: string; path: (cvId?: string | number) => string}
  skills: {label: string; path: string}
  languages: {label: string; path: string}
  singUp: {label: string; path: string}
  login: {label: string; path: string}
  forgotPassword: {label: string; path: string}
  resetPassword: {label: string; path: string}
  settings: {label: string; path: string}
}

export const AppRouterMap: IAppRouterMap = {
  users: {label: 'Employees', path: '/users'},
  userProfile: {
    label: 'user-profile',
    path: (userId = ':userId') => `/users/${userId}/profile`,
  },
  userSkills: {
    label: 'user-skills',
    path: (userId = ':userId') => `/users/${userId}/skills`,
  },
  userLanguages: {
    label: 'user-languages',
    path: (userId = ':userId') => `/users/${userId}/languages`,
  },

  projects: {label: 'projects', path: '/projects'},
  project: {
    label: 'project',
    path: (projectId = ':projectId') => `/projects/${projectId}`,
  },
  CVs: {label: 'cvs', path: '/cvs'},
  CVDetails: {
    label: 'cv-details',
    path: (cvId = ':cvId') => `/cvs/${cvId}/details`,
  },
  CVSkills: {
    label: 'cv-skills',
    path: (cvId = ':cvId') => `/cvs/${cvId}/skills`,
  },
  CVProjects: {
    label: 'cv-projects',
    path: (cvId = ':cvId') => `/cvs/${cvId}/projects`,
  },
  CVPreview: {
    label: 'cv-preview',
    path: (cvId = ':cvId') => `/cvs/${cvId}/preview`,
  },
  skills: {label: 'Skills', path: '/skills'},
  languages: {label: 'Languages', path: '/languages'},
  singUp: {label: 'signup', path: '/auth/signup'},
  login: {label: 'login', path: '/auth/login'},
  forgotPassword: {label: 'forgot-password', path: '/forgot-password'},
  resetPassword: {label: 'reset-password', path: '/reset-password'},
  settings: {label: 'Settings', path: '/settings'},
}

export interface Params {
  userId: string
  projectId: string
  cvId: string
  [key: string]: string
}
