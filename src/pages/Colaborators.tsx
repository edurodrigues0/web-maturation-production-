import {
  Button,
  Flex,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react'
import { Layout } from '../layout'
import { Input, NumberInput } from '../components/Form/Input'
import { api } from '../services/api'
import { ChangeEvent, useEffect, useState } from 'react'
import { Modal } from '../components/Modal'

import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { queryClient } from '../services/queryClient'
import { usePagination } from '../hooks/usePagination'
import { FiPlus } from 'react-icons/fi'
import { TableColaborators } from '../components/TableColaborators'
import { SideMenu } from '../components/SideMenu'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'

type Colaborator = {
  id: number
  name: string
  isOnSector: boolean
  createdAt: Date
}

type ColaboratorFormData = {
  colaboratorId: number
  colaboratorName: string
}

const validationFormSchema = yup.object().shape({
  colaboratorId: yup.number().min(3).required('Informe a matricula'),
  colaboratorName: yup.string().required('Informe o nome do colaborador'),
})

export function Colaborators() {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationFormSchema),
  })
  const [searchName, setSearchName] = useState(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.has('name')) {
      return url.searchParams.get('name') ?? ''
    }

    return ''
  })
  const [colaborators, setColaborators] = useState<Colaborator[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { page, setPagination } = usePagination()
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('name', searchName)
    window.history.pushState({}, '', url)
  }, [searchName])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearchName(event.target.value)
  }

  const createColaborator = useMutation(
    async (colaborator: ColaboratorFormData) => {
      const colaboratorBodyResponse = {
        id: colaborator.colaboratorId,
        name: colaborator.colaboratorName,
      }

      const response = await api.post('colaborators', colaboratorBodyResponse)

      return response.data.colaborator
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['colaborators', page, searchName])
      },
    },
  )

  const handleCreateColaborator: SubmitHandler<ColaboratorFormData> = async (
    data: ColaboratorFormData,
  ) => {
    await createColaborator.mutateAsync(data)
    reset()
    onClose()
  }

  useEffect(() => {
    setIsLoading(true)
    api
      .get(`/colaborators?page=${page}&&name=${searchName}`)
      .then((response) => {
        setColaborators(response.data.colaborators)
        setPagination(response.data.pagination)
      })
      .finally(() => setIsLoading(false))
  }, [page, searchName, setPagination])

  return (
    <Layout>
      <Flex w="100%" h="100%">
        <SideMenu />

        <Flex flex={1} p="1.875rem" gap="1.5rem" flexDirection="column">
          <Header title="Colaboradores" onSearch={onSearchInputChanged} />
          <Flex w="100%" alignItems="center" justifyContent="flex-start">
            <Button
              rightIcon={<FiPlus size={18} />}
              colorScheme="teal"
              onClick={onOpen}
            >
              Adicionar novo
            </Button>
            <Modal
              title="Adicionar colaborador"
              isOpen={isOpen}
              onClose={onClose}
            >
              <form onSubmit={handleSubmit(handleCreateColaborator)}>
                <ModalBody p="1rem">
                  <NumberInput
                    title="colaboratorId"
                    label="Matricula"
                    {...register('colaboratorId')}
                    error={errors.colaboratorId}
                    min={0}
                    max={6000}
                    step={100}
                    defaultValue={0}
                    onChange={() => {}}
                    mb="1rem"
                  />

                  <Input
                    title="colaboratorName"
                    label="Nome"
                    {...register('colaboratorName')}
                    error={errors.colaboratorName}
                  />
                </ModalBody>
                <ModalFooter gap="1rem">
                  <Button
                    colorScheme="teal"
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Criar
                  </Button>
                  <Button
                    isLoading={isSubmitting}
                    onClick={onClose}
                    colorScheme="red"
                  >
                    Cancelar
                  </Button>
                </ModalFooter>
              </form>
            </Modal>
          </Flex>

          <TableColaborators colaborators={colaborators} />
          <Pagination />
        </Flex>
      </Flex>
    </Layout>
  )
}
