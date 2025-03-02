import React, {createContext, useState, useContext, ReactNode} from 'react'

interface User {
  id: string
  full_name: string
  isAuthorized: boolean
}

interface UserContextProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserContext = createContext<UserContextProps | undefined>(undefined)

interface UserProviderProps {
  children: ReactNode
}

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User>({
    id: '',
    full_name: '',
    isAuthorized: false,
  })

  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  )
}

const useUser = (): UserContextProps => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export {UserProvider, useUser, UserContext}
