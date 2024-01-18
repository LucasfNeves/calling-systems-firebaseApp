import { PlusCircle } from 'phosphor-react'
import { Title, TitleRoot } from '../../components/Title'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/auth'
import { db } from '../../services/firebaseConections'
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'

interface Customer {
  id: string
  name: string
}

export function New() {
  const [client, setClient] = useState<Customer[]>([])
  const [loadClients, setLoadClients] = useState(true)
  const [complement, setComplement] = useState('')
  const [subject, setSubject] = useState('suporte')
  const [status, setStatus] = useState('aberto')
  const [custumerSelected, setCustomerSelected] = useState(0)
  const [idCustomer, setIdCustomer] = useState(false)

  const { user } = useContext(AuthContext)

  const { id } = useParams<{ id: string }>()

  const navigate = useNavigate()

  useEffect(() => {
    const listRef = collection(db, 'customers')

    async function loadCustomers() {
      const querySnapshot = await getDocs(listRef)
        .then((snapshot) => {
          const list = [] as Customer[]

          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              name: doc.data().name,
            })
          })

          if (snapshot.docs.length === 0) {
            toast.error('Nenhum cliente cadastrado')
            setClient([{ id: '1', name: 'FREELA' }])
            setLoadClients(false)
          } else {
            setClient(list)
            setLoadClients(false)
          }

          if (id) {
            loadId(list)
          }
        })
        .catch((error) => {
          console.log(error)
          toast.error('Erro ao carregar clientes')
          setLoadClients(false)
          setClient([{ id: '1', name: 'FREELA' }])
        })

      return querySnapshot
    }

    loadCustomers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  async function loadId(list: Customer[]) {
    const docRef = doc(db, 'tickets', id as string)

    await getDoc(docRef)
      .then((doc) => {
        setSubject(doc.data()?.subject)
        setStatus(doc.data()?.status)
        setComplement(doc.data()?.complement)

        const index = list.findIndex(
          (item) => item.name === doc.data()?.customer,
        )

        setCustomerSelected(index)

        setIdCustomer(true)
      })
      .catch((error) => {
        console.log(error)
        toast.error('Erro ao carregar chamado')
        setIdCustomer(false)
      })
  }

  function handleChangeCustomer(e: ChangeEvent<HTMLSelectElement>) {
    setCustomerSelected(Number(e.target.value))
  }

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    setStatus(e.target.value)
  }

  function handleChangeSelect(e: ChangeEvent<HTMLSelectElement>) {
    setSubject(e.target.value)
  }

  async function handleRegister(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (idCustomer) {
      await updateCustomer()
      return
    }

    if (custumerSelected === null) {
      toast.error('Escolha um cliente')
    } else if (subject === '') {
      toast.error('Escolha um assunto')
    } else if (status === '') {
      toast.error('Escolha um status')
    } else {
      await addDoc(collection(db, 'tickets'), {
        customer: client[custumerSelected].name,
        customer_id: client[custumerSelected].id,
        subject,
        status,
        complement,
        created: new Date(),
        userId: (user as { uid: string } | undefined)?.uid,
      })
        .then(() => {
          toast.success('Chamado registrado com sucesso!')
          setCustomerSelected(0)
          setSubject('')
          setStatus('aberto')
          setComplement('')
        })
        .catch((error) => {
          console.log(error)
          toast.error('Erro ao registrar chamado')
        })
    }
  }

  async function updateCustomer() {
    const docRef = doc(db, 'tickets', id as string)

    await updateDoc(docRef, {
      customer: client[custumerSelected].name,
      customer_id: client[custumerSelected].id,
      subject,
      status,
      complement,
      created: new Date(),
      userId: (user as { uid: string } | undefined)?.uid,
    })
      .then(() => {
        toast.success('Chamado editado com sucesso!')
        setCustomerSelected(0)
        setSubject('')
        setStatus('aberto')
        setComplement('')
        navigate('/app/dashboard')
      })
      .catch((error) => {
        console.log(error)
        toast.error('Erro ao editar chamado')
      })
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center px-4 lg:px-8">
      <TitleRoot>
        <Title title={id ? 'Editando chamado' : 'Novo chamado'}>
          <PlusCircle size={24} weight="fill" />
        </Title>
      </TitleRoot>
      <section className="my-8 flex w-full  flex-col items-center rounded-md bg-gray-100 p-8 shadow-md lg:items-start ">
        <form
          onSubmit={handleRegister}
          className="flex w-full flex-col items-center space-y-6 lg:items-start"
        >
          <label
            htmlFor=""
            className="flex w-full max-w-[37.5rem] flex-col items-start gap-2 font-bold text-zinc-700 "
          >
            Cliente
            {loadClients ? (
              <input
                className="flex w-full max-w-[37.5rem] items-center rounded-lg border border-zinc-300 bg-white px-4 py-3 font-normal shadow-md  outline-none placeholder:text-zinc-500 focus-within:border-violet-300 focus-within:ring-1 focus-within:ring-violet-300"
                type="text"
                disabled={true}
                value="Carregando..."
              />
            ) : (
              <select
                className="flex w-full max-w-[37.5rem] items-center rounded-lg border border-zinc-300 bg-white px-4 py-3 font-normal shadow-md  outline-none placeholder:text-zinc-500 focus-within:border-violet-300 focus-within:ring-1 focus-within:ring-violet-300"
                value={custumerSelected}
                onChange={handleChangeCustomer}
              >
                {client.map((item, index) => (
                  <option key={item.id} value={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label
            htmlFor="assunto"
            className="flex w-full max-w-[37.5rem] flex-col items-start gap-2 font-bold text-zinc-700 "
          >
            Assunto
            <select
              className="flex w-full max-w-[37.5rem] items-center rounded-lg border border-zinc-300 bg-white px-4 py-3 font-normal shadow-md  outline-none placeholder:text-zinc-500 focus-within:border-violet-300 focus-within:ring-1 focus-within:ring-violet-300"
              id="assunto"
              value={subject}
              onChange={handleChangeSelect}
            >
              <option value="suporte">Suporte</option>
              <option value="visita tecnica">Visita Tecnica</option>
              <option value="financeiro">Financeiro</option>
            </select>
          </label>

          <div className="flex w-full max-w-[37.5rem] flex-col items-start gap-2 font-bold text-zinc-700  ">
            <span>Escolha o Status</span>
            <div className="flex flex-col gap-2 font-semibold md:flex-row md:gap-8">
              <label htmlFor="open" className="flex cursor-pointer gap-2">
                <input
                  className="cursor-pointer focus:outline-none focus:ring-0"
                  type="radio"
                  id="open"
                  name="radio"
                  value="aberto"
                  onChange={handleOptionChange}
                  checked={status === 'aberto'}
                />
                Em aberto
              </label>
              <label className="flex cursor-pointer gap-2" htmlFor="progress">
                <input
                  className="cursor-pointer focus:outline-none focus:ring-0"
                  type="radio"
                  id="progress"
                  name="radio"
                  value="progresso"
                  onChange={handleOptionChange}
                  checked={status === 'progresso'}
                />
                Progresso
              </label>
              <label className="flex cursor-pointer gap-2" htmlFor="closed">
                <input
                  className="cursor-pointer focus:outline-none focus:ring-0"
                  type="radio"
                  id="closed"
                  name="radio"
                  value="atendido"
                  onChange={handleOptionChange}
                  checked={status === 'atendido'}
                />
                Atendido
              </label>
            </div>
          </div>

          <label
            className="items-center' flex w-full flex-col gap-2 font-bold text-zinc-700"
            htmlFor="complement"
          >
            Complemento
            <textarea
              placeholder="Descreve seu problema (opcional) ."
              id=" complement"
              value={complement}
              onChange={(e) => setComplement(e.target.value)}
              className="flex w-full max-w-[37.5rem] resize-none items-center rounded-lg border border-zinc-300 bg-white px-4 py-3 font-normal shadow-md  outline-none placeholder:text-zinc-500 focus-within:border-violet-300 focus-within:ring-1 focus-within:ring-violet-300"
            ></textarea>
          </label>

          <button
            className="w-full max-w-[37.5rem] rounded-lg bg-violet-900 py-3 font-semibold text-white shadow-lg  transition-colors duration-300 ease-in-out hover:bg-violet-800"
            type="submit"
          >
            Registrar
          </button>
        </form>
      </section>
    </div>
  )
}
