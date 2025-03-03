import {AppRouterMap} from '@/Shared'
import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {AuthResult} from 'cv-graphql'

const useSetUserData = (data?: AuthResult) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (data) {
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      localStorage.setItem(
        'user',
        JSON.stringify({
          id: data.user.id,
          full_name: data.user.profile.full_name,
          isAuthorized: true,
        })
      )
      void navigate(AppRouterMap.users.path)
    }
  }, [data, navigate])
}

export default useSetUserData
