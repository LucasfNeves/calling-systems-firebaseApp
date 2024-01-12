import { FormEvent, useContext, useState } from 'react'
import Logo from './../../assets/Logo.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { toast } from 'react-toastify'
import { InputControl, InputPrefix, InputRoot } from '../../components/Input'
import { Envelope, Eye } from 'phosphor-react'

export function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [viewPassword, setViewPassword] = useState(false)

  function handleViewPassword() {
    setViewPassword(!viewPassword)
  }

  const { signIn, loadingAuth } = useContext(AuthContext)

  function handleSignIn(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (email === '' || password === '') {
      toast.error('Preencha todos os campos!')
    }

    signIn(email, password)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900">
      <div className="flex w-[90%] max-w-[37.5rem] flex-col rounded-3xl bg-gray-200">
        <div className="flex h-[10rem] w-full items-center justify-center rounded-2xl rounded-b-none bg-violet-950 ">
          <img className="h-[80%] w-[20%]" src={Logo} alt="Logo" />
        </div>
        <form
          onSubmit={handleSignIn}
          className="mt-4 flex h-full w-full flex-col gap-4 px-6"
        >
          <h1 className="w-full text-center text-3xl font-semibold text-violet-950">
            Login
          </h1>
          <label htmlFor="email" className="flex flex-col gap-2">
            Digite seu E-mail
            <InputRoot>
              <InputPrefix>
                <Envelope size={22} />
              </InputPrefix>
              <InputControl
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu E-mail"
              />
            </InputRoot>
          </label>
          <label htmlFor="password" className="flex flex-col gap-2">
            Digite sua senha
            <InputRoot>
              <InputPrefix>
                <Eye
                  size={22}
                  className="cursor-pointer"
                  onClick={handleViewPassword}
                />
              </InputPrefix>
              <InputControl
                id="password"
                {...(viewPassword ? { type: 'text' } : { type: 'password' })}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua senha"
                autoComplete="off"
              />
            </InputRoot>
          </label>
          <button
            className="h-11 w-full rounded-md bg-violet-950  text-zinc-200  shadow-md  transition duration-300 ease-in-out hover:bg-violet-800"
            type="submit"
          >
            {loadingAuth ? 'Carregando...' : 'Entrar'}
          </button>
        </form>

        <div className="py-4 text-center text-zinc-600">
          Não tem uma conta?{' '}
          <Link
            to="/register"
            className="font-bold text-violet-950  transition duration-300 ease-in-out hover:text-violet-800"
          >
            {' '}
            Cadastre-se!
          </Link>
        </div>
      </div>
    </div>
  )
}
