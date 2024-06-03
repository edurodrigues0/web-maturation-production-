import * as yup from 'yup'

import { Box, Button, Checkbox, CheckboxGroup, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack } from "@chakra-ui/react"
import { Layout } from "../layout"

import { SubmitHandler, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { NumberInput } from '../components/Form/Input'
import { useMutation } from 'react-query'
import { api } from '../services/api'
import { queryClient } from '../services/queryClient'

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
  quantityProduced?: number | null
  litersOfProduct?: number | null
  realizedIn: Date
  activitiesArray: (string | undefined)[]
  colaboratorId: number
  // observation?: string
}

const validationFormSchema = yup.object().shape({
  quantityProduced: yup.number().optional().notRequired().default(null),
  litersOfProduct: yup.number().optional().notRequired().default(null),
  realizedIn: yup.date().required("Informe a data que foi realizado"),
  activitiesArray: yup.array().of(yup.string()).required("Selecione uma atividade"),
  colaboratorId: yup.number().min(3).required("Informe sua matricula"),
  // observation: yup.string().optional()
})

export function Production() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationFormSchema)
  })

  const registerProduction = useMutation(async (production: ProductionFormData) => {
    const response = await api.post('productions', production)

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
    <Layout>
      <Box
        w="30rem"
        bg="gray.200"
        mx="auto"
        mt="1rem"
        p="1.5rem"
        rounded="8px"
        boxShadow="2xl"
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Heading
          color="purple.700"
        >
          Produção
        </Heading>

        <Divider 
          orientation="horizontal" 
          h="2px" 
          bg="gray.900"
          mt="1rem"
        />

        <Box 
          as="form"
          onSubmit={handleSubmit(handleRegisterProduction)}
        >
          <NumberInput
            title='quantityProduced'
            label='Quantidade de pçs'
            {...register("quantityProduced")}
            min={0}
            max={6000}
            step={100}
            defaultValue={0}
            onChange={() => {}}
          />

          <NumberInput
            title='litersOfProduct'
            label='Quantidade de litros'
            defaultValue={0}
            {...register("litersOfProduct")}
            min={0}
            max={6000}
            step={100}
            onChange={() => {}}
          />

          <FormControl mt="1rem">
            <FormLabel htmlFor="realizedIn">
              Realizado em
            </FormLabel>
            <Input
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

          {/* <FormControl mt="1rem">
            <FormLabel htmlFor="observation">
              Observação
            </FormLabel>
            <Textarea
              id="observation"
              borderColor="gray.400"
              resize="none"
              {...register("observation")}
            />
          </FormControl> */}

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
        </Box>
      </Box>
    </Layout>
  )
}
