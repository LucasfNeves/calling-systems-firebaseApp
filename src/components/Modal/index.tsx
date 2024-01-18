import { X } from 'phosphor-react'
import { DetailsTextI, DetailsTextRoot } from './components/DetailsText'

interface ModalProps {
  close: () => void
  content:
    | {
        customer: string
        subject: string
        createdFormated: string
        complement: string
        status: string
      }
    | undefined
}

export function Modal({ close, content }: ModalProps) {
  function styleStatus(status: string) {
    if (status === 'aberto') {
      return '#5cb85c'
    } else if (status === 'progresso') {
      return '#f0ad4e'
    } else {
      return '#999'
    }
  }

  return (
    <div className="bg-modal fixed bottom-0 left-0 right-0 top-0 z-50">
      <div className="fixed left-1/2 top-1/2 flex w-[80%] max-w-[600px] -translate-x-1/2 -translate-y-1/2 transform rounded-lg bg-gray-200 px-8 py-16 shadow-2xl">
        <button
          type="button"
          onClick={close}
          className="absolute left-4 top-4 rounded-md bg-red-400 p-1 text-white"
        >
          <X size={25} weight="fill" />
        </button>
        <main className="flex flex-col space-y-4">
          <h2 className=" font-bold">Detalhes do chamado</h2>
          <div>
            <DetailsTextRoot>
              Cliente:
              <DetailsTextI>{content?.customer}</DetailsTextI>
            </DetailsTextRoot>
          </div>
          <div className="flex flex-col gap-4 md:flex-row md:gap-1">
            <DetailsTextRoot>
              Assunto:
              <DetailsTextI>{content?.subject}</DetailsTextI>
            </DetailsTextRoot>
            <DetailsTextRoot>
              Cadastrado em:
              <DetailsTextI>{content?.createdFormated}</DetailsTextI>
            </DetailsTextRoot>
          </div>
          <div>
            <DetailsTextRoot>
              Status:
              <DetailsTextI
                style={{ backgroundColor: styleStatus(content?.status || '') }}
              >
                {content?.status}
              </DetailsTextI>
            </DetailsTextRoot>
          </div>

          <div>
            <h3 className="font-bold">Complemento</h3>
            <p className="text-normal whitespace-pre-wrap pt-1">
              {content?.complement ? content?.complement : 'Sem complemento'}
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
