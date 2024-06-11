import * as yup from 'yup'
import { Box, Button, Checkbox, CheckboxGroup, Flex, FormControl, FormErrorMessage, FormLabel, Stack, Textarea } from "@chakra-ui/react";
import { Input, NumberInput } from "./Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from 'react-query';
import { api } from '../services/api';
import { queryClient } from '../services/queryClient';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const activitiesList = [
  { id: 1, activityName: 'Recebimento' },
  { id: 2, activityName: 'Viragem' },
  { id: 3, activityName: 'Pelicula' },
  { id: 4, activityName: 'Alcool' },
  { id: 5, activityName: 'Transferencia' },
  { id: 6, activityName: 'Limpeza de madeira' },
  { id: 7, activityName: 'Pack age' },
  { id: 8, activityName: 'Tretar com Guilherme' },
  { id: 9, activityName: 'Outros' },
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
  quantityProducedOnDoubleSidedGlue: yup.number().optional().notRequired().default(null),
  quantityProducedOnFinaltrim: yup.number().optional().notRequired().default(null),
  litersOfAcool: yup.number().optional().notRequired().default(null),
  litersOfDoubleSidedGlue: yup.number().optional().notRequired().default(null),
  litersOfFinalTrim: yup.number().optional().notRequired().default(null),
  realizedIn: yup.date().required("Informe a data que foi realizado"),
  activitiesArray: yup.array().of(yup.string()).required("Selecione uma atividade"),
  colaboratorId: yup.number().min(3).required("Informe sua matricula"),
  observation: yup.string().optional()
})


export function ProductionForm() {
  const { admin } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationFormSchema)
  })

  const registerProduction = useMutation(async (production: ProductionFormData) => {
    const productionBodyResponse = {
        minilitersOfAlcool: production.litersOfAcool && production.litersOfAcool * 1000, // miniliters = 1L * 1000
        minilitersOfDoubleSidedGlue: production.litersOfDoubleSidedGlue && production.litersOfDoubleSidedGlue, // miniliters = 1L * 1000
        minilitersOfFinalTrim: production.litersOfFinalTrim && production.litersOfFinalTrim * 1000, // miniliters = 1L * 1000
        quantityProducedOnAlcool: production.quantityProducedOnAlcool,
        quantityProducedOnSidedGlue: production.quantityProducedOnDoubleSidedGlue,
        quantityProducedOnFinalTrim: production.quantityProducedOnFinaltrim,
        realizedIn: production.realizedIn,
        activitiesArray: production.activitiesArray,
        colaboratorId: production.colaboratorId,
    }
    
    const response = await api.post('productions', productionBodyResponse)

    return response.data.production
  }, {
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries('productions')
    }
  })

  const handleRegisterProduction: SubmitHandler<ProductionFormData> = async (data: ProductionFormData) => {
    await registerProduction.mutateAsync(data)
  }

  return (
    <Box
      as="form"
      onSubmit={handleSubmit(handleRegisterProduction)}
    >
      <Flex
        gap={["1rem", "1rem", "2rem"]}
        flexDir={["column", "column", "row"]}
        alignItems="flex-end"
        justifyContent="center"
      >
        <NumberInput
          title='quantityProducedOnAlcool'
          label='Quantidade de pçs no alcool'
          {...register("quantityProducedOnAlcool")}
          min={0}
          max={6000}
          step={100}
          defaultValue={0}
          onChange={() => {}}
        />

        <NumberInput
          title='quantityProducedOnDoubleSidedGlue'
          label='Quantidade de pçs cola dois lados'
          {...register("quantityProducedOnDoubleSidedGlue")}
          min={0}
          max={6000}
          step={100}
          defaultValue={0}
          onChange={() => {}}
        />

        <NumberInput
          title='quantityProducedOnFinaltrim'
          label='Quantidade de pçs no arremate'
          {...register("quantityProducedOnFinaltrim")}
          min={0}
          max={6000}
          step={100}
          defaultValue={0}
          onChange={() => {}}
        />
      </Flex>

      <Flex
        gap={["1rem", "1rem", "2rem"]}
        flexDir={["column", "column", "row"]}
        alignItems="flex-end"
        justifyContent="center"
      >
        <NumberInput
          title='litersOfAcool'
          label='Quantidade de litros no alcool'
          defaultValue={0}
          {...register("litersOfAcool")}
          min={0}
          max={6000}
          step={100}
          onChange={() => {}}
        />

        <NumberInput
          title='litersOfDoubleSidedGlue'
          label='Quantidade de litros na cola dois lados'
          defaultValue={0}
          {...register("litersOfDoubleSidedGlue")}
          min={0}
          max={6000}
          step={100}
          onChange={() => {}}
        />

        <NumberInput
          title='litersOfFinalTrim'
          label='Quantidade de litros no arremate'
          defaultValue={0}
          {...register("litersOfFinalTrim")}
          min={0}
          max={6000}
          step={100}
          onChange={() => {}}
        />
      </Flex>

      <FormControl mt="1rem">
        <FormLabel htmlFor="realizedIn">
          Realizado em
        </FormLabel>

        <Input
          title='realizedIn'
          id="realizedIn"
          borderColor="gray.400" 
          placeholder='Selecione o dia' 
          type='date'
          {...register("realizedIn")}
        />
        <FormErrorMessage>
          {errors.realizedIn && errors.realizedIn.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl
        mt="1rem"
        as="fieldset"
      >
        <FormLabel 
          as="legend" 
          htmlFor="activitiesArray"
        >
          Atividades realizadas
        </FormLabel>
        <CheckboxGroup
          defaultValue={['1']}
        >
          <Stack
            spacing={[1, 3]} 
            direction={["column", "row"]} 
            flexWrap="wrap"
          >
            {activitiesList.map((activity) => (
              <Checkbox
                id={activity.id.toString()}
                key={activity.id}
                value={activity.id.toString()}
                borderColor="gray.400" 
                size="lg"
                {...register("activitiesArray")}
              >
                {activity.activityName}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </FormControl>

      <NumberInput
        title="registration"
        label="Matricula"
        error={errors.colaboratorId}
        {...register("colaboratorId")}
        min={0}
        max={9999}
        step={1}
        onChange={() => {}}
      />

      <FormControl mt="1rem">
        <FormLabel htmlFor="observation">
          Observação
        </FormLabel>
        <Textarea
          id="observation"
          borderColor="gray.400"
          resize="none"
          {...register("observation")}
        />
      </FormControl>

      <Button
        type="submit"
        w="full" 
        mt="3rem"
        colorScheme="purple" 
        size="lg"
        isLoading={isSubmitting}
      >
        Enviar
      </Button>
      {
        admin && (
          <Button
            type="submit"
            w="full" 
            mt="1rem"
            colorScheme="pink" 
            size="lg"
            onClick={() => navigate("/producao")}
            isLoading={isSubmitting}
          >
            Voltar
          </Button>
        )
      }
    </Box>
  )
}