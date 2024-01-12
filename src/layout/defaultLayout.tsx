import { Navigate, Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

export function DefaultLayout() {
  const { user, loading } = useContext(AuthContext)

  if (loading) {
    // renderizar algum tipo de componente de carregamento
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        Carregando...
      </div>
    )
  }

  if (!user) {
    // Redirecionar para a página de login
    return <Navigate to="/" replace />
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-app">
      <Sidebar />
      <Outlet />
    </div>
  )
}
