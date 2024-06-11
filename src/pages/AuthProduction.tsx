import {  Flex, IconButton, Skeleton, Stack} from "@chakra-ui/react";
import { Section } from "../components/Section";
import { Layout } from "../layout";
import { Input } from "../components/Form/Input";
import { api } from "../services/api";
import { ChangeEvent, useEffect, useState } from "react";

import { usePagination } from "../hooks/usePagination";
import { TableProductions } from "../components/TableProductions";
import { FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";


type Production = {
  id: number
  colaboratorName: string
  colaboratorId: string
  realizedIn: Date
  activities: string
}

export function AuthProduction() {
  const navigate = useNavigate()
  const [searchRealizedIn, setSearchRealizedIn] = useState(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.has('name')) {
      return url.searchParams.get('name') ?? ''
    }

    return ''
  })
  const [productions, setProductions] = useState<Production[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const { page, setPagination, onCurrentPage } = usePagination()

  useEffect(() => {
    onCurrentPage(1)
  }, [onCurrentPage])

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setSearchRealizedIn(event.target.value)
  }

  useEffect(() => {
    setIsLoading(true)
    api.get(
      `/productions?page=${page}&&realizedIn=${searchRealizedIn}`
    ).then((response) => {
      setProductions(response.data.productions),
      setPagination(response.data.pagination)
    }).finally(() => setIsLoading(false))
  }, [page, searchRealizedIn, setPagination])

  function goToProductionForm() {
    navigate('/formulario')
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
              type="date"
            />

            <IconButton
              aria-label="Novo colaborador"
              icon={<FiPlus size={24} />}
              px="2rem"
              mt="1rem"
              fontSize="0.725rem"
              colorScheme="purple"
              onClick={goToProductionForm}
            />
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
              <TableProductions
                productions={productions}
              />
            )
          }
        </Flex>
      </Flex>
    </Layout>
  )
}