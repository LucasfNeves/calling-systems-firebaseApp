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

export function Dashboard() {
  return (
    <>
      <div className="relative mt-8 flex w-full flex-col items-center px-4 lg:px-8">
        <TitleRoot>
          <Title title="Chamados">
            <Chat size={24} weight="fill" />
          </Title>
        </TitleRoot>

        <div className="mt-6 flex h-fit w-full items-center justify-end ">
          <Link
            className="flex w-fit items-center gap-2 rounded-2xl bg-violet-900 p-4 text-white shadow-md transition-colors duration-300 ease-in-out hover:bg-violet-800"
            to="/new"
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
              <TableRow>
                <TableBodyCell data-label="Cliente"> Mercado</TableBodyCell>
                <TableBodyCell data-label="Assunto"> Suporte</TableBodyCell>
                <TableBodyCell data-label="Status">
                  <span className="rounded-md bg-green-400 p-2 font-semibold text-white">
                    {' '}
                    Em aberto
                  </span>
                </TableBodyCell>
                <TableBodyCell data-label="Cadastro em">
                  20/07/2021
                </TableBodyCell>
                <TableBodyCell data-label="#">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-md bg-blue-600 p-2 transition-colors duration-300 ease-in-out hover:bg-blue-500"
                      type="button"
                    >
                      <MagnifyingGlass
                        size={17}
                        weight="bold"
                        className="text-white"
                      />
                    </button>
                    <button
                      className="rounded-md bg-orange-500 p-2 transition-colors duration-300 ease-in-out hover:bg-orange-400"
                      type="button"
                    >
                      <Pen size={17} weight="fill" className="text-white" />
                    </button>
                  </div>
                </TableBodyCell>
              </TableRow>

              <TableRow>
                <TableBodyCell data-label="Cliente"> Mercado</TableBodyCell>
                <TableBodyCell data-label="Assunto"> Suporte</TableBodyCell>
                <TableBodyCell data-label="Status">
                  <span className="rounded-md bg-green-400 p-2 font-semibold text-white">
                    {' '}
                    Em aberto
                  </span>
                </TableBodyCell>
                <TableBodyCell data-label="Cadastro em">
                  20/07/2021
                </TableBodyCell>
                <TableBodyCell data-label="#">
                  <div className="flex justify-center gap-2">
                    <button
                      className="rounded-md bg-blue-600 p-2"
                      type="button"
                    >
                      <MagnifyingGlass
                        size={17}
                        weight="bold"
                        className="text-white"
                      />
                    </button>
                    <button
                      className="rounded-md bg-orange-500 p-2"
                      type="button"
                    >
                      <Pen size={17} weight="fill" className="text-white" />
                    </button>
                  </div>
                </TableBodyCell>
              </TableRow>
            </TableBody>
          </Table>
        </main>
      </div>
    </>
  )
}
