import { Button, TableContainer, Table as ChakraTable, Tbody, Td, Thead, Tr, Th } from "@chakra-ui/react"
import { FaEdit } from "react-icons/fa"
import { PaginationButtons } from "./PaginationButtons"

type Colaborator = {
  id: number
  name: string
  isOnSector: boolean
  createdAt: Date
}

type TableProps = {
  colaborators: Colaborator[]
  onPrefetch: (colaboratorId: number) => void
  onOpen: () => void
}

export function TableColaborators({ colaborators, onPrefetch }: TableProps) {
  return (
    <TableContainer 
      p="1rem" 
      h="100%"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <ChakraTable variant="striped" colorScheme="purple">
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
          {
            colaborators.map((colaborator) => {
              return (
                <Tr key={colaborator.id}>
                  <Td>{colaborator.id}</Td>
                  <Td>{colaborator.name}</Td>
                  <Td px="2.5rem">
                    {colaborator.isOnSector ? '🟢' : '🔴'}
                  </Td>
                  <Td>
                    {
                      new Date(colaborator.createdAt)
                      .toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })
                    }
                  </Td>
                  <Td>
                    <Button
                      p="1rem"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      variant="ghost" 
                      colorScheme="purple"
                      onMouseEnter={() => onPrefetch(colaborator.id)}
                    >
                      <FaEdit size={18} />
                    </Button>
                  </Td>
                </Tr>
              )
            })
          }
        </Tbody>
      </ChakraTable>

      <PaginationButtons />
    </TableContainer>
  )
}