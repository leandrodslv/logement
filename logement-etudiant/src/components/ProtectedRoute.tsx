import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { PageSpinner } from './ui/Spinner'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: 'etudiant' | 'bailleur'
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) return <PageSpinner />

  if (!user) {
    return <Navigate to="/connexion" state={{ from: location }} replace />
  }

  if (requiredRole && profile?.role !== requiredRole) {
    const redirect = profile?.role === 'bailleur' ? '/profil/bailleur' : '/profil/etudiant'
    return <Navigate to={redirect} replace />
  }

  return <>{children}</>
}
