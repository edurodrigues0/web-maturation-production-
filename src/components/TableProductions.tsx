import { CgDetailsMore } from 'react-icons/cg'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Button } from './ui/button'
import { FiMoreHorizontal } from 'react-icons/fi'

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Matricula</TableHead>
          <TableHead className="w-28">Nome</TableHead>
          <TableHead className="w-28">Atividades</TableHead>
          <TableHead className="w-28">Realizada em</TableHead>
          <TableHead className="w-28">Detalhes</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {productions.map((production) => {
          return (
            <TableRow key={production.id}>
              <TableCell className="h-14 font-bold">
                {production.colaboratorId}
              </TableCell>
              <TableCell className="h-14">
                {production.colaboratorName}
              </TableCell>
              <TableCell className="h-14">{production.activities}</TableCell>
              <TableCell className="h-14">{production.realizedIn}</TableCell>
              <TableCell className="h-14">
                <Button size="icon" variant="outline">
                  <FiMoreHorizontal size={22} />
                </Button>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
