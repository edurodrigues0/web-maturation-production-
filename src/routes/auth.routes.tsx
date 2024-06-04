import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { Production } from "../pages/Production";


export function AuthRoutes() {
  const admin = localStorage.getItem('@maturation-production:admin')

  return (
    <Routes>
      <Route path="/" element={<Production />} />
      <Route path="/login" element={<Login />} />

      {!admin && <Route path="*" element={<Navigate to="/" />} />}
    </Routes>
  )
}