import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../services/api'

interface Admin {
  id: string
  name: string
  email: string
}

interface Data {
  token: string
  admin: Admin
}

type DataProps = Data | undefined

interface AuthContextData {
  signIn: (email: string, password: string) => void
  signOut: () => void
  admin: Admin | undefined
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<DataProps>()

  useEffect(() => {
    const token = localStorage.getItem('@maturation-production:token')
    const admin = localStorage.getItem('@maturation-production:admin')

    if (token === null) {
      signOut()
    }

    if (token && admin) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`

      setData({
        token,
        admin: JSON.parse(admin),
      })
    }
  }, [])

  async function signIn(email: string, password: string) {
    try {
      const response = await api.post('admin/sessions', { email, password })
      const { admin, token } = response.data

      localStorage.setItem(
        '@maturation-production:admin',
        JSON.stringify(admin),
      )
      localStorage.setItem('@maturation-production:token', token)

      api.defaults.headers.common.Authorization = `Bearer ${token}`
      setData({ admin, token })
    } catch (error) {
      if (error) {
        alert(error)
      } else {
        alert('Não foi possível se autenticar.')
      }
    }
  }

  async function signOut() {
    localStorage.removeItem('@maturation-production:token')
    localStorage.removeItem('@maturation-production:admin')

    setData(undefined)
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        admin: data?.admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
