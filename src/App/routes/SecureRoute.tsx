import {FC, ReactNode} from 'react'
import {Navigate} from 'react-router-dom'

interface SecureRouteProps {
  isRedirection: boolean
  redirectTo: string
  children: ReactNode
}

const SecureRoute: FC<SecureRouteProps> = ({
  isRedirection,
  redirectTo,
  children,
}) => {
  return isRedirection ? <Navigate to={redirectTo} /> : children
}

export default SecureRoute
