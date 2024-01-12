import avatarImage from './../../assets/avatar.svg'
import cover from './../../assets/cover.svg'
import { useContext } from 'react'
import { AuthContext, User } from '../../contexts/auth'
import { Gear, House, Users } from 'phosphor-react'
import { NavItem } from './components/NavItem'

export function Sidebar() {
  const { user } = useContext(AuthContext) as { user: User }
  return (
    <aside className="flex h-auto w-full flex-col gap-4 overflow-auto border-r border-r-zinc-200 lg:h-full lg:w-[200px] ">
      <div
        className="hidden lg:block lg:h-[12rem] lg:w-full lg:rounded-b-xl lg:bg-cover lg:bg-center lg:p-6 "
        style={{ backgroundImage: `url(${cover})` }}
      >
        <img
          src={user.avatarUrl === null ? avatarImage : user.avatarUrl}
          alt="Avatar"
          className="mx-auto h-[8rem] w-[8rem] rounded-full border-2 border-purple-800 shadow-lg"
        />
      </div>
      <nav className="flex gap-6 border-b border-zinc-200 px-2 py-2 lg:flex-col lg:border-none">
        <NavItem
          route={'dashboard'}
          icon={<House size={24} weight="fill" className=" hidden lg:block" />}
          text={'Chamados'}
        />
        <NavItem
          route={'customers'}
          icon={<Users size={24} weight="fill" className=" hidden lg:block" />}
          text={'Clientes'}
        />
        <NavItem
          route={'profile'}
          icon={<Gear size={24} weight="fill" className=" hidden lg:block" />}
          text={'Perfil'}
        />
      </nav>
    </aside>
  )
}
