import { Divider, Text, VStack } from "@chakra-ui/react"
import * as Button from "./Button"
import { FaUsers, FaChartBar, FaClipboardList, FaPowerOff } from "react-icons/fa"
import { SlSpeedometer } from "react-icons/sl"

export function Section() {
  return (
    <VStack
      p="2rem"
      w="15rem"
      spacing={2}
      borderWidth="1px"
      borderColor="purple.500"
      rounded="6px"
    >
      <Button.Root
        leftIcon={<SlSpeedometer size={18} />}
        isActive={true}
      >
        <Text w="full">Dashboard</Text>
      </Button.Root>

      <Button.Root
        leftIcon={<FaUsers size={18} />}
      >
        <Text>Colaboradores</Text>
      </Button.Root>

      <Button.Root
        leftIcon={<FaChartBar size={18} />}
      >
        <Text>Produção</Text>
      </Button.Root>

      <Button.Root
        leftIcon={<FaClipboardList size={18} />}
      >
        <Text>Tarefas</Text>
      </Button.Root>

      <Divider borderColor="purple.500" />

      <Button.Root
        leftIcon={<FaPowerOff size={18} />}
      >
        <Text>Sair</Text>
      </Button.Root>
    </VStack>
  )
}