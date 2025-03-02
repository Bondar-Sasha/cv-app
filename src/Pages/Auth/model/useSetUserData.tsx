import {useUser} from '@/App'
import {AppRouterMap} from '@/Shared'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthResult} from 'cv-graphql'

const useSetUserData = (data?: AuthResult) => {
  const navigate = useNavigate()
  const {setUser} = useUser()

  useEffect(() => {
    if (data) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)

      setUser({
        id: data.user.id,
        full_name: data.user.profile.full_name || data.user.email,
        isAuthorized: true,
      })
      void navigate(AppRouterMap.users.path)
    }
  }, [data, navigate, setUser])
}

export default useSetUserData
