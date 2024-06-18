import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Colaborators } from '../pages/Colaborators'
import { NotFound } from '../pages/NotFound'
import { Production } from '../pages/Production'
import { Form } from '../pages/Form'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/colaboradores" element={<Colaborators />} />
      <Route path="/producao" element={<Production />} />
      <Route path="/formulario" element={<Form />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
