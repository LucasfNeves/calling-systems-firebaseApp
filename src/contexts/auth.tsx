import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react'
import { auth, db } from '../services/firebaseConections'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export interface User {
  uid: string
  nome: string
  email: string
  avatarUrl: null | string
}

interface AuthContextData {
  signed: boolean
  user: object | null
  loadingAuth: boolean
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, nome: string) => Promise<void>
  signOutApp: () => Promise<void>
  storageUser: (data: unknown) => void
  setUser: Dispatch<SetStateAction<User | null>>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loadingAuth, setLoadingAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  const navigate = useNavigate()

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem('@tickets:user')

      if (storageUser) {
        setUser(JSON.parse(storageUser))
        setLoading(false)
      }

      setLoading(false)
    }

    loadUser()
  }, [])

  async function signIn(email: string, password: string) {
    setLoadingAuth(true)

    await signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userUid = userCredential.user.uid

        const docRef = doc(db, 'users', userUid)
        const docSnap = await getDoc(docRef)

        const data = {
          uid: userUid,
          nome: docSnap.data()?.nome,
          email: userCredential.user.email,
          avatarUrl: docSnap.data()?.avatarUrl,
        }

        setUser(data as User)
        storageUser(data)
        setLoadingAuth(false)
        toast.success(`Bem vindo(a) de volta, ${data.nome}!`)
        navigate('/app/dashboard')
      })
      .catch((error) => {
        console.log(error)
        if (error.code === 'auth/invalid-credential') {
          toast.error('Ops! Usuário ou senha incorretos.')
        } else if (error.code === 'auth/invalid-email') {
          toast.error('Usuário não cadastrado.')
        } else {
          toast.error('Ops! Algo deu errado.')
        }

        setLoadingAuth(false)
      })
  }

  async function signUp(email: string, password: string, nome: string) {
    setLoadingAuth(true)

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const userUid = userCredential.user.uid

        await setDoc(doc(db, 'users', userUid), {
          nome,
          avatarUrl: null,
          email,
        }).then(() => {
          const data = {
            uid: userUid,
            nome,
            avatarUrl: null,
            email,
          }
          setLoadingAuth(false)
          toast.success(
            `Cadastro realizado com sucesso! Bem vindo(a), ${nome}!`,
          )
          setUser(data)
          storageUser(data)
          navigate('/app/dashboard')
        })
      })
      .catch((error) => {
        if (error.code === 'auth/weak-password') {
          toast.error('A senha deve ter pelo menos 6 caracteres.')
        } else if (error.code === 'auth/email-already-in-use') {
          toast.error('Este e-mail já está em uso.')
        } else {
          toast.error('Ops! Algo deu errado.')
        }

        console.log(error)
        setLoadingAuth(false)
      })
  }

  function storageUser(data: unknown) {
    localStorage.setItem('@tickets:user', JSON.stringify(data))
  }

  async function signOutApp() {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem('@tickets:user')
        setUser(null)
        navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  // Controla se o usuário está logado ou não
  const signed = user !== null

  return (
    <AuthContext.Provider
      value={{
        signed,
        user,
        signIn,
        signUp,
        loadingAuth,
        loading,
        signOutApp,
        storageUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
