import { BrowserRouter } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AuthRoutes } from './auth.routes'
import { AppRoutes } from './app.routes'

export function Routes() {
  const { admin } = useAuth()
  console.log('Admin:', admin)

  return <BrowserRouter>{admin ? <AppRoutes /> : <AuthRoutes />}</BrowserRouter>
}
