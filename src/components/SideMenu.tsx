import {
  FaUsers,
  FaChartBar,
  FaClipboardList,
  FaPowerOff,
} from 'react-icons/fa'
import { SlSpeedometer } from 'react-icons/sl'
import { useAuth } from '../hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const NAV_LINKS_LIST = [
  {
    title: 'Dashboard',
    icon: <SlSpeedometer />,
    href: '/',
  },
  {
    title: 'Colaboradores',
    icon: <FaUsers />,
    href: '/colaboradores',
  },
  {
    title: 'Produção',
    icon: <FaChartBar />,
    href: '/producao',
  },
  {
    title: 'Tarefas',
    icon: <FaClipboardList />,
    href: '/tarefas',
  },
]

export function SideMenu() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  function handleSignOut() {
    signOut()
  }

  return (
    <div className="p-12 w-80 h-full flex flex-col gap-4 border-r-2 border-slate-700">
      <h1 className="text-4xl font-bold mb-12">Scala</h1>

      {NAV_LINKS_LIST.map((button) => {
        return (
          <Button
            className="gap-2"
            onClick={() => navigate(button.href)}
            variant={location.pathname === button.href ? 'active' : 'outline'}
            key={button.title}
            size="lg"
          >
            {button.icon}
            {button.title}
          </Button>
        )
      })}

      <div className="w-full border-t-2 border-slate-700 my-4" />

      <Button className="gap-2" onClick={handleSignOut} variant="outline">
        <FaPowerOff />
        Sair
      </Button>
    </div>
  )
}
