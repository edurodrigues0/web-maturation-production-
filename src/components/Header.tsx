import { useAuth } from '../hooks/useAuth'
import { ChangeEvent } from 'react'
import { Input } from './ui/input'
import { Avatar, AvatarFallback } from './ui/avatar'

type HeaderProps = {
  title?: string
  onSearch?: (event: ChangeEvent<HTMLInputElement>) => void
  isDateInput?: boolean
}

export function Header({
  title = 'Scala',
  onSearch,
  isDateInput,
}: HeaderProps) {
  const { admin } = useAuth()
  const name = admin?.name.trim().slice(0, 2)

  return (
    <header className="py-12 px-11 flex items-center justify-between">
      <h1 className="text-4xl w-64 font-bold">{title}</h1>

      {onSearch && (
        <Input
          onChange={onSearch}
          type={isDateInput ? 'date' : 'text'}
          className="w-96 py-3 px-6"
          placeholder="Procure aqui..."
        />
      )}

      <div className="flex items-center gap-2">
        <Avatar className="w-12 h-12 bg-background">
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>

        <div className="flex flex-col items-start justify-start">
          <span className="font-bold text-base">{admin?.name}</span>
          <span className="font-thin text-xs">admin</span>
        </div>
      </div>
    </header>
  )
}
