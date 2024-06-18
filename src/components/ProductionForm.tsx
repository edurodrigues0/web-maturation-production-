import * as yup from 'yup'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { api } from '../services/api'
import { queryClient } from '../services/queryClient'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Input } from './Form/Input'
import { Textarea } from './Form/Textarea'
import { Button } from './ui/button'
import CheckboxForm from './Form/Checkbox'

const items = [
  { id: '1', label: 'Recebimento' },
  { id: '2', label: 'Viragem' },
  { id: '3', label: 'Pelicula' },
  { id: '4', label: 'Alcool' },
  { id: '5', label: 'Transferencia' },
  { id: '6', label: 'Limpeza de madeira' },
  { id: '7', label: 'Pack age' },
  { id: '8', label: 'Tretar com Guilherme' },
  { id: '9', label: 'Outros' },
]

type ProductionFormData = {
  quantityProducedOnAlcool?: number | null
  quantityProducedOnDoubleSidedGlue?: number | null
  quantityProducedOnFinaltrim?: number | null
  litersOfAcool?: number | null
  litersOfDoubleSidedGlue?: number | null
  litersOfFinalTrim?: number | null
  realizedIn: Date
  activitiesArray: (string | undefined)[]
  colaboratorId: number
  observation?: string
}

const validationFormSchema = yup.object().shape({
  quantityProducedOnAlcool: yup.number().optional().notRequired().default(null),
  quantityProducedOnDoubleSidedGlue: yup
    .number()
    .optional()
    .notRequired()
    .default(null),
  quantityProducedOnFinaltrim: yup
    .number()
    .optional()
    .notRequired()
    .default(null),
  litersOfAcool: yup.number().optional().notRequired().default(null),
  litersOfDoubleSidedGlue: yup.number().optional().notRequired().default(null),
  litersOfFinalTrim: yup.number().optional().notRequired().default(null),
  realizedIn: yup.date().required('Informe a data que foi realizado'),
  activitiesArray: yup
    .array()
    .of(yup.string())
    .required('Selecione uma atividade'),
  colaboratorId: yup.number().min(3).required('Informe sua matricula'),
  observation: yup.string().optional(),
})

export function ProductionForm() {
  const { admin } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationFormSchema),
  })

  const registerProduction = useMutation(
    async (production: ProductionFormData) => {
      const productionBodyResponse = {
        minilitersOfAlcool:
          production.litersOfAcool && production.litersOfAcool * 1000, // miniliters = 1L * 1000
        minilitersOfDoubleSidedGlue:
          production.litersOfDoubleSidedGlue &&
          production.litersOfDoubleSidedGlue * 1000, // miniliters = 1L * 1000
        minilitersOfFinalTrim:
          production.litersOfFinalTrim && production.litersOfFinalTrim * 1000, // miniliters = 1L * 1000
        quantityProducedOnAlcool: production.quantityProducedOnAlcool,
        quantityProducedOnSidedGlue:
          production.quantityProducedOnDoubleSidedGlue,
        quantityProducedOnFinalTrim: production.quantityProducedOnFinaltrim,
        realizedIn: production.realizedIn,
        activitiesArray: production.activitiesArray,
        colaboratorId: production.colaboratorId,
      }

      const response = await api.post('productions', productionBodyResponse)

      return response.data.production
    },
    {
      onSuccess: () => {
        reset()
        queryClient.invalidateQueries('productions')
      },
    },
  )

  const handleRegisterProduction: SubmitHandler<ProductionFormData> = async (
    data: ProductionFormData,
  ) => {
    await registerProduction.mutateAsync(data)
  }

  return (
    <form
      className="w-96 mx-auto flex flex-col justify-center"
      onSubmit={handleSubmit(handleRegisterProduction)}
    >
      <div className="flex flex-row items-end justify-center gap-4">
        <Input
          title="quantityProducedOnAlcool"
          type="number"
          label="Quantidade pcs no alcool"
          min={0}
          {...register('quantityProducedOnAlcool')}
        />
        <Input
          title="quantityProducedOnDoubleSidedGlue"
          type="number"
          label="Quantidade pcs no dois lados"
          min={0}
          {...register('quantityProducedOnDoubleSidedGlue')}
        />
        <Input
          title="quantityProducedOnFinaltrim"
          type="number"
          label="Quantidade pcs no arremate"
          min={0}
          {...register('quantityProducedOnFinaltrim')}
        />
      </div>

      <div className="flex flex-row items-end justify-center gap-4 mt-4 mb-4">
        <Input
          title="litersOfAlcool"
          type="number"
          label="Quantidade de litros no alcool"
          min={0}
          {...register('litersOfAcool')}
        />
        <Input
          title="litersOfDoubleSidedGlue"
          type="number"
          label="Quantidade de litros no dois lados"
          min={0}
          {...register('litersOfDoubleSidedGlue')}
        />
        <Input
          title="litersOfFinalTrim"
          type="number"
          label="Quantidade de litros no arremate"
          min={0}
          {...register('litersOfFinalTrim')}
        />
      </div>

      <Input
        className="w-full"
        type="date"
        title="realizedIn"
        label="Realizado em"
        {...register('realizedIn')}
        error={errors.realizedIn}
      />

      <CheckboxForm
        error={errors.activitiesArray}
        control={control}
        items={items}
      />

      <Input
        type="number"
        title="registration"
        label="Matricula"
        {...register('colaboratorId')}
      />

      <div className="mt-4">
        <Textarea
          className="resize-none h-20"
          label="Observacao"
          title="observation"
          {...register('observation')}
        />
      </div>

      <Button
        type="submit"
        variant="secondary"
        className="mt-8"
        disabled={isSubmitting}
      >
        Enviar
      </Button>
      {admin && (
        <Button
          onClick={() => navigate('/producao')}
          disabled={isSubmitting}
          variant="destructive"
          className="mt-4"
        >
          Voltar
        </Button>
      )}
    </form>
  )
}
