/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { yupResolver } from '@hookform/resolvers/yup'
import { ReactNode, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { UseMutationResult } from 'react-query'
import * as yup from 'yup'

type ColaboratorFormData = {
  colaboratorId: number
  colaboratorName: string
  status?: boolean
}

const validationFormSchema = yup.object().shape({
  colaboratorId: yup.number().min(3).required('Informe a matricula'),
  colaboratorName: yup.string().required('Informe o nome do colaborador'),
  colaboratorStatus: yup.boolean().optional().notRequired(),
})

type ColaboratorDialogProps = {
  children: ReactNode
  onFunctionColaborator: UseMutationResult<
    any,
    unknown,
    ColaboratorFormData,
    unknown
  >
}

export function ColaboratorDialog({
  children,
  onFunctionColaborator,
}: ColaboratorDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>()

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationFormSchema),
  })

  const handleCreateColaborator: SubmitHandler<ColaboratorFormData> = async (
    data: ColaboratorFormData,
  ) => {
    await onFunctionColaborator.mutateAsync(data)
    reset()
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[37rem]">
        <form onSubmit={handleSubmit(handleCreateColaborator)}>
          <DialogHeader>
            <DialogTitle>Criar colaborador</DialogTitle>
            <DialogDescription>
              Adicione matricula e nome para adicionar novo colaborador.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="colaboratorId" className="text-right">
                Matricula
              </Label>
              <Input
                id="colaboratorId"
                className="col-span-3"
                type="number"
                {...register('colaboratorId')}
              />
              {errors.colaboratorId && (
                <span>{errors.colaboratorId.message}</span>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="colaboratorName" className="text-right">
                Nome
              </Label>
              <Input
                id="colaboratorName"
                className="col-span-3"
                {...register('colaboratorName')}
              />
              {errors.colaboratorName && (
                <span>{errors.colaboratorName.message}</span>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={isSubmitting} variant="destructive">
                Cancelar
              </Button>
            </DialogClose>

            <Button disabled={isSubmitting} type="submit">
              Criar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
