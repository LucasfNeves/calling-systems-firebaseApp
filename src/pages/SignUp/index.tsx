import { useContext, useState } from 'react'
import Logo from './../../assets/Logo.svg'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import { Envelope, Eye } from 'phosphor-react'
import { InputRoot, InputPrefix, InputControl } from '../../components/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import schemaSignUp from '../../schema/schemaSingnUp'
import { useForm } from 'react-hook-form'

type FormData = {
  name: string
  email: string
  password: string
}

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schemaSignUp) })

  const [viewPassword, setViewPassword] = useState(false)

  function handleViewPassword() {
    setViewPassword(!viewPassword)
  }

  const { signUp, loadingAuth } = useContext(AuthContext)

  async function handleSignUp(data: FormData) {
    await signUp(data.email, data.password, data.name)
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-neutral-900">
      <div className="flex w-[90%] max-w-[37.5rem] flex-col rounded-3xl bg-gray-200">
        <div className="flex h-[10rem] w-full items-center justify-center rounded-2xl rounded-b-none bg-violet-950 ">
          <img className="h-[80%] w-[20%]" src={Logo} alt="Logo" />
        </div>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="mt-4 flex h-full w-full flex-col gap-4 px-6"
        >
          <h1 className="w-full text-center text-3xl font-semibold text-violet-950">
            Cadastro
          </h1>
          <label htmlFor="name" className="flex flex-col gap-2">
            Digite seu nome
            <InputRoot>
              <InputControl
                id="name"
                type="text"
                placeholder="Digite seu nome"
                {...register('name')}
              />
            </InputRoot>
            {errors.name && (
              <span className="text-sm text-red-500">
                {errors.name.message}
              </span>
            )}
          </label>
          <label htmlFor="email" className="flex flex-col gap-2">
            Digite seu E-mail
            <InputRoot>
              <InputPrefix>
                <Envelope size={22} />
              </InputPrefix>
              <InputControl
                id="email"
                type="email"
                placeholder="Digite seu E-mail"
                {...register('email')}
              />
            </InputRoot>
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
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
                placeholder="Digite sua senha"
                autoComplete="off"
                {...register('password')}
              />
            </InputRoot>
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </label>
          <button
            className="h-11 w-full rounded-md bg-violet-950  text-zinc-200  shadow-md transition duration-300 ease-in-out hover:bg-violet-800"
            type="submit"
          >
            {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="py-4 text-center text-zinc-600">
          Já tem uma conta?{' '}
          <Link
            to="/"
            className="font-bold text-violet-950  transition duration-300 ease-in-out hover:text-violet-800"
          >
            {' '}
            Faça o login!
          </Link>
        </div>
      </div>
    </div>
  )
}
