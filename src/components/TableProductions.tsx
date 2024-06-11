import { Button, TableContainer, Table as ChakraTable, Tbody, Td, Thead, Tr, Th } from "@chakra-ui/react"
import { PaginationButtons } from "./PaginationButtons"
import { CgDetailsMore } from "react-icons/cg"

type Production = {
  id: number
  colaboratorName: string
  colaboratorId: string
  realizedIn: Date
  activities: string
}

type TableProps = {
  productions: Production[]
  onOpen?: () => void
}

export function TableProductions({ productions, onOpen }: TableProps) {
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
            <Th>Atividades</Th>
            <Th>Realizada em</Th>
            <Th>Detalhes</Th>
          </Tr>
        </Thead>

        <Tbody>
          {
            productions.map((production) => {
              return (
                <Tr key={production.id}>
                  <Td>{production.colaboratorId}</Td>
                  <Td>{production.colaboratorName}</Td>
                  <Td>{production.activities}</Td>
                  <Td>
                    {
                      new Date(production.realizedIn)
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
                      onClick={onOpen}
                    >
                      <CgDetailsMore size={18} />
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