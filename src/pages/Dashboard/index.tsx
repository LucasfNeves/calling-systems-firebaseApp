import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

export function Dashboard() {
  const { signOutApp } = useContext(AuthContext)

  async function handleSignOut() {
    await signOutApp()
  }

  return (
    <>
      <div>
        <button onClick={handleSignOut}>Sair</button>
      </div>
    </>
  )
}
