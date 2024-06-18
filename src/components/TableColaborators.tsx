import { FiMoreHorizontal } from 'react-icons/fi'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table'
import { Button } from './ui/button'

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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-28">Matricula</TableHead>
          <TableHead className="w-28">Nome</TableHead>
          <TableHead className="w-28">Status</TableHead>
          <TableHead className="w-28">Criado em</TableHead>
          <TableHead className="w-28">Detalhes</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {colaborators.map((colaborator) => {
          return (
            <TableRow key={colaborator.id}>
              <TableCell className="h-14 font-bold">{colaborator.id}</TableCell>
              <TableCell className="h-14">{colaborator.name}</TableCell>
              <TableCell className="h-14 ">
                {colaborator.isOnSector ? 'Ativo' : 'Desligado'}
              </TableCell>
              <TableCell className="h-14 ">
                {new Date(colaborator.createdAt).toLocaleDateString('pt-BR', {
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
