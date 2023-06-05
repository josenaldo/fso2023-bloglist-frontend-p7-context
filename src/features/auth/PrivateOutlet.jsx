import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/features/auth'

const PrivateOutlet = () => {
  const { user } = useAuth()
  const location = useLocation()

  return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />
}

export default PrivateOutlet
