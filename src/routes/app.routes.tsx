import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Colaborators } from '../pages/Colaborators'
import { NotFound } from '../pages/NotFound'
import { AuthProduction } from '../pages/AuthProduction'
import { Tasks } from '../pages/Tasks'
import { AuthProductionForm } from '../pages/AuthProductionForm'


export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/colaboradores" element={<Colaborators />} />
      <Route path="/producao" element={<AuthProduction />} />
      <Route path='/formulario' element={<AuthProductionForm />} />
      <Route path="/tarefas" element={<Tasks />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}