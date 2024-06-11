import { Divider, VStack } from "@chakra-ui/react"
import * as Button from "./Button"
import { FaUsers, FaChartBar, FaClipboardList, FaPowerOff } from "react-icons/fa"
import { SlSpeedometer } from "react-icons/sl"
import { useAuth } from "../hooks/useAuth"
import { useLocation, useNavigate } from "react-router-dom"

export function Section() {
  const location = useLocation()
  const navigate = useNavigate()
  const { signOut } = useAuth()

  function handleSignOut() {
    signOut()
  }

  return (
    <VStack
      p={["0.5rem", "1rem", "2rem"]}
      w="15rem"
      spacing={[1, 1, 2]}
      borderWidth="1px"
      borderColor="purple.500"
      rounded="6px"
      mr="1rem"
    >
      <Button.Root
        onClick={() => navigate('/')}
        leftIcon={<SlSpeedometer size={18} />}
        isActive={location.pathname === '/'}
      >
        Dashboard
      </Button.Root>

      <Button.Root
        onClick={() => navigate('/colaboradores')}
        leftIcon={<FaUsers size={18} />}
        isActive={location.pathname === '/colaboradores'}
      >
        Colaboradores
      </Button.Root>

      <Button.Root
        onClick={() => navigate('/producao')}
        leftIcon={<FaChartBar size={18} />}
        isActive={location.pathname === '/producao'}
      >
        Produção
      </Button.Root>

      <Button.Root
        onClick={() => navigate('/tarefas')}
        leftIcon={<FaClipboardList size={18} />}
        isActive={location.pathname === '/tarefas'}
      >
        Tarefas
      </Button.Root>

      <Divider borderColor="purple.500" />

      <Button.Root
        onClick={handleSignOut}
        leftIcon={<FaPowerOff size={18} />}
      >
        Sair
      </Button.Root>
    </VStack>
  )
}