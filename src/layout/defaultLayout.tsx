import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/Sidebar'
import { AuthContext } from '../contexts/auth'
import { useContext } from 'react'

export function DefaultLayout() {
  const { user } = useContext(AuthContext)

  if (!user) {
    // renderizar algum tipo de componente de carregamento ou nada
    return null
  }

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-app">
      <Sidebar />
      <Outlet />
    </div>
  )
}
