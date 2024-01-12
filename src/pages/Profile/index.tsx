import { Gear } from 'phosphor-react'
import { TitleRoot, Title } from '../../components/Title'
import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import { AuthContext, User } from '../../contexts/auth'

import { PhotoInput } from './components/PhotoInput'
import { InputControl, InputRoot } from '../../components/Input'
import { toast } from 'react-toastify'
import { doc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../../services/firebaseConections'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

export function Profile() {
  const { user } = useContext(AuthContext) as { user: User }
  const { signOutApp, setUser, storageUser } = useContext(AuthContext)

  // essa useState recebe a foto do usuário, se não tiver foto, recebe null
  const [avatarUrl, setAvatarUrl] = useState(user ? user.avatarUrl : null)
  const [name, setName] = useState(user ? user.nome : null)
  const [email, setEmail] = useState(user ? user.email : null)
  const [imageAvatar, setImageAvatar] = useState<File | null>(null)

  const handleLogout = async () => await signOutApp()

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0]

      if (image.type === 'image/jpeg' || image.type === 'image/png') {
        setImageAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      } else {
        toast.error('Envie uma imagem do tipo PNG ou JPEG')
        setImageAvatar(null)
        return null
      }
    }
  }

  async function handleUpload() {
    const currentUid = user.uid

    const uploadRef = ref(storage, `images/${currentUid}/${imageAvatar?.name}`)

    uploadBytes(uploadRef, imageAvatar as Blob).then((snapShot) => {
      getDownloadURL(snapShot.ref).then(async (downloadURL) => {
        const urlPhoto = downloadURL

        const docRef = doc(db, 'users', user.uid)

        await updateDoc(docRef, {
          avatarUrl: urlPhoto,
          nome: name,
        })
          .then(() => {
            const data = {
              ...user,
              avatarUrl: urlPhoto,
              nome: name,
            }

            setUser(data as User)
            storageUser(data as User)
            toast.success('Informações alterada com sucesso!')
          })
          .catch((error) => {
            console.log(error)
            toast.error('Erro ao atualizar o perfil')
          })
      })
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const docRef = doc(db, 'users', user.uid)

    if (imageAvatar === null && name !== '') {
      await updateDoc(docRef, {
        nome: name,
      }).then(() => {
        const data = {
          ...user,
          nome: name,
        }

        setUser(data as User)
        storageUser(data as User)
        toast.success('Nome alterado com sucesso!')
      })
    } else if (name !== '' && imageAvatar !== null) {
      handleUpload()
    }
  }

  return (
    <div className="mt-8 flex w-full flex-col items-center px-4 lg:px-8">
      <TitleRoot>
        <Title title="Profile">
          <Gear size={24} weight="fill" />
        </Title>
      </TitleRoot>

      <section className="my-8 flex w-full  flex-col items-center rounded-md bg-gray-100 p-8 shadow-md lg:items-start ">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center space-y-6 lg:items-start"
        >
          <PhotoInput
            avatarUrl={avatarUrl}
            setAvatarUrl={setAvatarUrl}
            handleFile={handleFile}
          />

          <InputRoot>
            <InputControl
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </InputRoot>

          <InputRoot>
            <InputControl
              value={email || ''}
              disabled={true}
              style={{ cursor: 'not-allowed' }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputRoot>

          <button
            className="w-full max-w-[37.5rem] rounded-lg bg-violet-900 py-3 font-semibold text-white shadow-lg  transition-colors duration-300 ease-in-out hover:bg-violet-800"
            type="submit"
          >
            Salvar
          </button>
        </form>
      </section>
      <section className="mb-6 flex w-full flex-col items-center rounded-md bg-gray-100 px-8 py-4 shadow-md lg:items-start">
        <button
          onClick={handleLogout}
          className=" w-[10rem] rounded-lg bg-red-500 py-3 font-semibold text-white shadow-lg transition-colors duration-300 ease-in-out hover:bg-red-400"
          type="button"
        >
          Sair
        </button>
      </section>
    </div>
  )
}

/**
 * sr-only: é uma classe do tailwind que esconde o elemento da tela, mas não do leitor de tela
 */
