import { Button, Flex, IconButton, ModalBody, ModalFooter, Skeleton, Stack, useDisclosure } from "@chakra-ui/react";
import { Section } from "../components/Section";
import { Layout } from "../layout";
import { Input, NumberInput } from "../components/Form/Input";
import { api } from "../services/api";
import { ChangeEvent, useEffect, useState } from "react";
import { Modal } from "../components/Modal";


import * as yup from 'yup'
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import { queryClient } from "../services/queryClient";
import { usePagination } from "../hooks/usePagination";
import { FiPlus } from "react-icons/fi";
import { TableColaborators } from "../components/TableColaborators";

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
  colaboratorId: yup.number().min(3).required("Informe a matricula"),
  colaboratorName: yup.string().required("Informe o nome do colaborador")
})

export function Colaborators() {
  const {
    reset,
    register, 
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(validationFormSchema)
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
    window.history.pushState({}, "", url)
  }, [searchName])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearchName(event.target.value)
  }

  const createColaborator = useMutation(async (colaborator: ColaboratorFormData) => {
    const colaboratorBodyResponse = {
      id: colaborator.colaboratorId,
      name: colaborator.colaboratorName,
    }

    const response = await api.post('colaborators', colaboratorBodyResponse)

    return response.data.colaborator
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['colaborators', page, searchName])
    }
  })

  const handleCreateColaborator: SubmitHandler<ColaboratorFormData> 
  = async (data: ColaboratorFormData) => {
    await createColaborator.mutateAsync(data)
    reset()
    onClose()
  }

  useEffect(() => {
    setIsLoading(true)
    api.get(
      `/colaborators?page=${page}&&name=${searchName}`
    ).then((response) => {
      setColaborators(response.data.colaborators),
      setPagination(response.data.pagination)
    }).finally(() => setIsLoading(false))
  }, [page, searchName, setPagination])

  async function handlePrefetchColaborator(colaboratorId: number) {
    await queryClient.prefetchQuery(['colaborator', colaboratorId], async () => {
      const response = await api.get(`/colaborators/${colaboratorId}`)

      console.log('response:', response.data)
      return response.data
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    })
  }

  return (
    <Layout>
      <Flex
        w="100%"
        h="100%"
        px={["1rem", "1rem", "1rem"]}
      >
        <Section />
        <Flex
          flex={1}
          borderRadius="6px"
          overflow="hidden"
          borderWidth="2px"
          borderColor="purple.500"
          flexDirection="column"
        >
          <Flex
            w="100%"
            h="5rem"
            alignItems="center"
            justifyContent="center"
            px="1rem"
            gap="1rem"
          >
            <Input
              onChange={onSearchInputChanged}
              title="Search"
              placeholder="Procurar"
            />

            <IconButton
              aria-label="Novo colaborador"
              icon={<FiPlus size={24} />}
              isDisabled={isOpen}
              px="2rem"
              mt="1rem"
              fontSize="0.725rem"
              colorScheme="purple"
              onClick={() => onOpen()}
            />

            <Modal
              title="Criar colaborador"
              isOpen={isOpen}
              onClose={onClose}
            >
              <form
                onSubmit={handleSubmit(handleCreateColaborator)}
              >
                <ModalBody p="1rem">
                  <NumberInput 
                    title="colaboratorId"
                    label="Matricula"
                    {...register("colaboratorId")}
                    error={errors.colaboratorId}
                    min={0}
                    max={6000}
                    step={100}
                    defaultValue={0}
                    onChange={() => {}}
                  />
                  <Input 
                    title="colaboratorName"
                    label="Nome"
                    {...register("colaboratorName")}
                    error={errors.colaboratorName}
                  />
                </ModalBody>
                <ModalFooter gap="1rem">
                  <Button 
                    colorScheme="purple" 
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

          {
            isLoading ? (
              <Stack
                p="1rem"
              >
                <Skeleton height="3rem" />
                <Skeleton height="3rem" />
                <Skeleton height="3rem" />
              </Stack>
            ) 
            : (
              <>
                <TableColaborators
                  colaborators={colaborators}
                  onPrefetch={handlePrefetchColaborator}
                  onOpen={onOpen}
                />
              </>
            )
          }
        </Flex>
      </Flex>
    </Layout>
  )
}