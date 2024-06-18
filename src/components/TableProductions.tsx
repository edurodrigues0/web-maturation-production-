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
}

export function TableProductions({ productions }: TableProps) {
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
              <TableCell className="h-14">
                {new Date(production.realizedIn).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })}
              </TableCell>
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
