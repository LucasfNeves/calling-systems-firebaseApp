import { Pen } from 'phosphor-react'
import { Title, TitleRoot } from '../../components/Title'
import { InputControl, InputRoot } from '../../components/Input'
import { FormEvent, useState } from 'react'
import { db } from '../../services/firebaseConections'
import { addDoc, collection } from 'firebase/firestore'
import { toast } from 'react-toastify'

export function Customers() {
  const [name, setName] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [adrees, setAdrees] = useState('')

  async function handleRegiste(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (name !== '' && cnpj !== '' && adrees !== '') {
      await addDoc(collection(db, 'customers'), {
        name,
        cnpj,
        adrees,
      })
        .then(() => {
          toast.success('Cliente cadastrado com sucesso!')
          setName('')
          setCnpj('')
          setAdrees('')
        })
        .catch((error) => {
          console.log(error)
          toast.error('Ops! Algo deu errado.')
        })
    } else {
      toast.error('Preencha todos os campos!')
    }
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center px-4 lg:px-8">
      <TitleRoot>
        <Title title="Clientes">
          <Pen weight="fill" size={24} />
        </Title>
      </TitleRoot>

      <section className="my-8 flex w-full  flex-col items-center rounded-md bg-gray-100 p-8 shadow-md lg:items-start ">
        <form
          onSubmit={handleRegiste}
          className="flex w-full flex-col items-center space-y-6 lg:items-start"
        >
          <label
            className="flex w-full flex-col gap-2 font-bold  text-zinc-700"
            htmlFor="clientName"
          >
            Nome do cliente
            <InputRoot>
              <InputControl
                value={name}
                onChange={(e) => setName(e.target.value)}
                id="clientName"
                placeholder="Digite o nome do cliente"
              />
            </InputRoot>
          </label>
          <label
            className="flex w-full flex-col gap-2 font-bold  text-zinc-700 "
            htmlFor="clientCnpj"
          >
            CNPJ
            <InputRoot>
              <InputControl
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                id="clientCnpj"
                placeholder="00.000.000/0000-00"
              />
            </InputRoot>
          </label>
          <label
            className="flex w-full flex-col gap-2 font-bold text-zinc-700"
            htmlFor="clientAdrees"
          >
            Endereço
            <InputRoot>
              <InputControl
                value={adrees}
                onChange={(e) => setAdrees(e.target.value)}
                id="clientAdrees"
                placeholder="Rua de exemplo, nº 0, Centro, São Paulo, SP"
              />
            </InputRoot>
          </label>
          <button
            className="w-full max-w-[37.5rem] rounded-lg bg-violet-900 py-3 font-semibold text-white shadow-lg  transition-colors duration-300 ease-in-out hover:bg-violet-800"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </section>
    </div>
  )
}
