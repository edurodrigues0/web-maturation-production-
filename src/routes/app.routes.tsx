import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Colaborators } from '../pages/Colaborators'
import { NotFound } from '../pages/NotFound'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/colaboradores" element={<Colaborators />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}