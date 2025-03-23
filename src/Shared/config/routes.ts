interface IAppRouterMap {
  users: {label: string; path: string}
  userProfile: {
    label: string
    path: (userId?: string | number) => string
    additionalPath: string
  }
  userSkills: {label: string; path: (userId?: string | number) => string}
  userLanguages: {label: string; path: (userId?: string | number) => string}
  projects: {label: string; path: string}
  project: {label: string; path: (projectId?: string | number) => string}
  CVs: {label: string; path: string}
  CVDetails: {
    label: string
    path: (cvId?: string | number) => string
    additionalPath: string
  }
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
    label: 'Profile',
    path: (userId = ':userId') => `/users/${userId}/profile`,
    additionalPath: `/users/:userId`,
  },
  userSkills: {
    label: 'Skills',
    path: (userId = ':userId') => `/users/${userId}/skills`,
  },
  userLanguages: {
    label: 'Languages',
    path: (userId = ':userId') => `/users/${userId}/languages`,
  },

  projects: {label: 'projects', path: '/projects'},
  project: {
    label: 'Project',
    path: (projectId = ':projectId') => `/projects/${projectId}`,
  },
  CVs: {label: 'cvs', path: '/cvs'},
  CVDetails: {
    label: 'Details',
    path: (cvId = ':cvId') => `/cvs/${cvId}/details`,
    additionalPath: `/cvs/:cvId`,
  },
  CVSkills: {
    label: 'Skills',
    path: (cvId = ':cvId') => `/cvs/${cvId}/skills`,
  },
  CVProjects: {
    label: 'Projects',
    path: (cvId = ':cvId') => `/cvs/${cvId}/projects`,
  },
  CVPreview: {
    label: 'Preview',
    path: (cvId = ':cvId') => `/cvs/${cvId}/preview`,
  },
  skills: {label: 'Skills', path: '/skills'},
  languages: {label: 'Languages', path: '/languages'},
  singUp: {label: '', path: '/auth/signup'},
  login: {label: '', path: '/auth/login'},
  forgotPassword: {label: '', path: '/forgot-password'},
  resetPassword: {label: '', path: '/reset-password'},
  settings: {label: 'Settings', path: '/settings'},
}

export interface Params {
  userId: string
  projectId: string
  cvId: string
  [key: string]: string
}
