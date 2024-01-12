import { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

interface NavItemProps {
  route: string
  icon: ReactNode
  text: string
}

export function NavItem({ route, icon, text, ...props }: NavItemProps) {
  // Verifica se a rota atual é igual a rota passada
  const location = useLocation()

  const isActive = location.pathname.includes(route)

  return (
    <NavLink
      to={route}
      className={` flex w-full items-center justify-center gap-4 rounded-lg px-2 py-2 font-semibold text-zinc-700 transition duration-300 ease-in-out hover:bg-violet-50 lg:justify-start ${
        isActive && 'bg-violet-100 text-violet-900 shadow-sm'
      }`}
      {...props}
    >
      {icon}
      {text}
    </NavLink>
  )
}
