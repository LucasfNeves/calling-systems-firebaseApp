import { Link } from 'react-router-dom'
import { Title, TitleRoot } from '../../components/Title'
import { Chat, MagnifyingGlass, Pen, PlusCircle } from 'phosphor-react'
import {
  Table,
  TableBody,
  TableBodyCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from './components/Table'
import { useEffect, useState } from 'react'
import {
  QuerySnapshot,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  Timestamp,
  QueryDocumentSnapshot,
  DocumentData,
  startAfter,
} from 'firebase/firestore'
import { db } from '../../services/firebaseConections'
import { format } from 'date-fns'
import { Modal } from '../../components/Modal'

interface Chamado {
  id: string
  customer: string
  customer_id: string
  subject: string
  status: string
  complement: string
  created: string
  userId: string
  createdFormated: string
}

export function Dashboard() {
  const [chamados, setChamados] = useState<Chamado[]>([])
  const [loading, setLoading] = useState(true)
  const [isEmpity, setIsEmpity] = useState(false)
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<Chamado, DocumentData>>()
  const [loadMore, setLoadMore] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [details, setDetails] = useState<Chamado>()

  useEffect(() => {
    const listRef = collection(db, 'tickets')

    async function loadChamados() {
      const q = query(listRef, orderBy('created', 'desc'), limit(5))

      const querySnapshot = await getDocs(q)
      setChamados([])
      await updateState(querySnapshot as QuerySnapshot<Chamado>)

      setLoading(false)
    }

    loadChamados()

    return () => {
      setLoading(false)
    }
  }, [])

  async function updateState(querySnapshot: QuerySnapshot<Chamado>) {
    const isCollectionEmpty = querySnapshot.size === 0

    if (!isCollectionEmpty) {
      const list = [] as Chamado[]

      querySnapshot.forEach((doc) => {
        list.push({
          id: doc.id,
          customer: doc.data().customer,
          customer_id: doc.data().customer_id,
          subject: doc.data().subject,
          status: doc.data().status,
          complement: doc.data().complement,
          created: doc.data().created,
          userId: doc.data().userId,
          createdFormated: format(
            (doc.data().created as unknown as Timestamp).toDate(),
            'dd/MM/yyyy',
          ),
        })

        console.log(typeof doc.data().created)
      })

      console.log(list.length)

      list.forEach((item) => {
        console.log(item.created)
      })

      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1] // pegando o ultimo documento da lista
      setLastDoc(lastDoc)

      setChamados((chamados) => [...chamados, ...list])
    } else {
      setIsEmpity(true)
      setLoadMore(false)
    }
  }

  async function handleMore() {
    setLoadMore(true)

    const listRef = collection(db, 'tickets')

    const q = query(
      listRef,
      orderBy('created', 'desc'),
      startAfter(lastDoc),
      limit(5),
    )

    const querySnapshot = await getDocs(q)

    await updateState(querySnapshot as QuerySnapshot<Chamado>).then(() => {
      setLoadMore(false)
    })
  }

  function handleShowModal(item: Chamado) {
    setShowModal(!showModal)
    setDetails(item)
  }

  if (loading) {
    return (
      <div className="relative mt-8 flex w-full flex-col items-center px-4 lg:px-8">
        <TitleRoot>
          <Title title="Chamados">
            <Chat size={24} weight="fill" />
          </Title>
        </TitleRoot>

        <div className=" mt-8 flex min-h-[300px] w-full flex-col items-center justify-center  rounded-md bg-gray-100 p-4 shadow-md ">
          <span className="mb-4 text-lg font-semibold text-zinc-700">
            Carregando...
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="relative mt-8 flex w-full flex-col items-center px-4 lg:px-8">
        <TitleRoot>
          <Title title="Chamados">
            <Chat size={24} weight="fill" />
          </Title>
        </TitleRoot>

        {chamados.length === 0 ? (
          <div className=" mt-8 flex min-h-[300px] w-full flex-col items-center justify-center  rounded-md bg-gray-100 p-4 shadow-md ">
            <span className="mb-4 text-lg font-semibold text-zinc-700">
              Nenhum chamado encontrado...
            </span>

            <Link
              className="flex w-fit items-center gap-2 rounded-2xl bg-violet-900 p-4 text-white shadow-md transition-colors duration-300 ease-in-out hover:bg-violet-800"
              to="/app/new"
            >
              <PlusCircle size={24} weight="fill" />
              Novo chamado
            </Link>
          </div>
        ) : (
          <>
            <div className="mt-6 flex h-fit w-full items-center justify-end ">
              <Link
                className="flex w-fit items-center gap-2 rounded-2xl bg-violet-900 p-4 text-white shadow-md transition-colors duration-300 ease-in-out hover:bg-violet-800"
                to="/app/new"
              >
                <PlusCircle size={24} weight="fill" />
                Novo chamado
              </Link>
            </div>

            <main className="my-6 flex w-full  flex-col items-center rounded-md lg:items-start ">
              <Table>
                <TableHead>
                  <TableHeadCell scope="coll">Cliente</TableHeadCell>
                  <TableHeadCell scope="coll">Assunto</TableHeadCell>
                  <TableHeadCell scope="coll">Status</TableHeadCell>
                  <TableHeadCell scope="coll">Cadastro em</TableHeadCell>
                  <TableHeadCell scope="coll">#</TableHeadCell>
                </TableHead>
                <TableBody>
                  {chamados.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableBodyCell data-label="Cliente">
                          {item.customer}
                        </TableBodyCell>
                        <TableBodyCell data-label="Assunto">
                          {item.subject}
                        </TableBodyCell>
                        <TableBodyCell data-label="Status">
                          <span
                            className={`rounded-md  p-2 font-semibold text-white ${
                              item.status === 'aberto'
                                ? 'bg-green-400 '
                                : 'bg-gray-500'
                            } ${
                              item.status === 'progresso'
                                ? 'bg-orange-400 '
                                : 'bg-gray-500'
                            }}`}
                          >
                            {item.status}
                          </span>
                        </TableBodyCell>
                        <TableBodyCell data-label="Cadastro em">
                          {item.createdFormated}
                        </TableBodyCell>
                        <TableBodyCell data-label="#">
                          <div className="flex justify-center gap-2">
                            <button
                              className="rounded-md bg-blue-600 p-2 transition-colors duration-300 ease-in-out hover:bg-blue-500"
                              type="button"
                              onClick={() => handleShowModal(item)}
                            >
                              <MagnifyingGlass
                                size={17}
                                weight="bold"
                                className="text-white"
                              />
                            </button>
                            <Link
                              className="rounded-md bg-orange-500 p-2 transition-colors duration-300 ease-in-out hover:bg-orange-400"
                              to={`/app/new/${item.id}`}
                            >
                              <Pen
                                size={17}
                                weight="fill"
                                className="text-white"
                              />
                            </Link>
                          </div>
                        </TableBodyCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </main>
          </>
        )}
        {loadMore && (
          <h3 className="text-lg text-zinc-600">Buscando mais chamados...</h3>
        )}
        {!loadMore && !isEmpity && (
          <button
            className="my-6 rounded-md bg-violet-500 px-3 py-1 text-white "
            onClick={handleMore}
          >
            Buscar mais
          </button>
        )}
      </div>

      {showModal && (
        <Modal close={() => setShowModal(!showModal)} content={details} />
      )}
    </>
  )
}
