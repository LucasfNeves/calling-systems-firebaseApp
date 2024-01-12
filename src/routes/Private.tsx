import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/auth'

interface PrivateProps {
  children: ReactNode
}

export function Private({ children }: PrivateProps) {
  const { signed, loading } = useContext(AuthContext)

  if (loading) {
    return <div>Carregando...</div>
  }

  if (!signed) {
    return <Navigate to="/" replace />
  }

  return children
}
