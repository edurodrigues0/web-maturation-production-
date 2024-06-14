import {
  Button,
  TableContainer,
  Table as ChakraTable,
  Tbody,
  Td,
  Thead,
  Tr,
  Th,
} from '@chakra-ui/react'
import { FaEdit } from 'react-icons/fa'

type Colaborator = {
  id: number
  name: string
  isOnSector: boolean
  createdAt: Date
}

type TableProps = {
  colaborators: Colaborator[]
}

export function TableColaborators({ colaborators }: TableProps) {
  return (
    <TableContainer px="1rem" mt="1rem">
      <ChakraTable size="md">
        <Thead>
          <Tr>
            <Th>Matricula</Th>
            <Th>Nome</Th>
            <Th>Status</Th>
            <Th>Criado em</Th>
            <Th>Editar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {colaborators.map((colaborator) => {
            return (
              <Tr key={colaborator.id}>
                <Td>{colaborator.id}</Td>
                <Td>{colaborator.name}</Td>
                <Td>{colaborator.isOnSector ? 'Sim' : 'Nao'}</Td>
                <Td>
                  {new Date(colaborator.createdAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </Td>
                <Td>
                  <Button size="sm">
                    <FaEdit />
                  </Button>
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </ChakraTable>
    </TableContainer>
  )
}
