import {Link, useLocation} from 'react-router-dom'
import LoginPage from './ui/LoginPage'
import RegisterPage from './ui/RegisterPage'

const Auth = () => {
  const location = useLocation().pathname

  return (
    <div className="">
      <div className="">
        <Link to="/auth/login">Log In</Link>
        <Link to="/auth/signup">Sign Up</Link>
      </div>

      {location === '/auth/login' && <LoginPage />}
      {location === '/auth/signup' && <RegisterPage />}
    </div>
  )
}

export default Auth
