import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../pages/Login'
import { Home } from '@/pages/Home'

export function AuthRoutes() {
  const admin = localStorage.getItem('@maturation-production:admin')

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {!admin && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}
